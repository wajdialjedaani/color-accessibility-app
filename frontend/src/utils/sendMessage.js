export const sendMessage = async (message) => {
    try {     
      const response = await fetch('/api/createMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.choices[0].message
    } catch (error) {
      console.log(error);
    }
  }
  