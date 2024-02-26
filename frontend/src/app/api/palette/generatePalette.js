export const generatePalette = (fn, colors) => {
    const url = "https://colormind.io/api/";
    const data = {
      model: "default",
      input: colors?.length === 0 ? undefined : colors.map(i => i.isLocked ? i.rgb : "N")
    };
    
    const http = new XMLHttpRequest();
  
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        const result = JSON.parse(http.responseText).result;

        const palette = result.map((i, idx) => {
            return {
                rgb: colors[idx]?.isLocked ? colors[idx]?.rgb : i, 
                isLocked: colors[idx]?.isLocked ?? false
            }
        })
        fn(palette);
      }
    };
  
    http.open("POST", url, true);
    http.send(JSON.stringify(data));
  };