import { Button } from "react-bootstrap"

export const metadata = {
  title: 'Color App',
}

export default function Page() {
  return (
    <center>
      <div className="main-heading">
        Color Accessibility App
      </div>
      <div className="main-description">
        See the world in every hue: 
        Discover our Color Accessibility App for an inclusive and vibrant digital experience.
      </div>
      <div style={{marginTop: 60}}>
        <Button className="main-button" style={{ backgroundColor: "#E0835A" }} href="/pages/recognition">Color Recognition</Button>
        <Button className="main-button" style={{ backgroundColor: "#B4AF93" }} href="/pages/palette">Color Palette</Button>
        <Button className="main-button" style={{ backgroundColor: "#39545B" }} href="/pages/simulator">Color Simulator</Button>
      </div>
      <div>
      <div className="element">
        <p> Color Recognition </p>
        <p className="text"> 
          Decode the colors around you. Our Color Recognition feature identifies 
          and labels colors in real-time, 
          making the world more accessible for those with visual impairments. 
          Experience the power of inclusive design at your fingertips.
        </p>
      </div>
      <div className="element">
        <p> Color Palette </p>
        <p className="text"> 
          Let your creativity flourish. Our Color Palette Generator empowers you to 
          craft captivating color schemes that are accessible to everyone. 
          Achieve harmony and inclusivity in your designs effortlessly.
        </p>
      </div>
      <div className="element">
        <p> Color Simulator </p>
        <p className="text">
          Step into another perspective. Our Color Simulator offers a unique glimpse 
          into the world of color-blindness. Experience popular color-blindness types 
          realistically, allowing you to design with empathy and understanding.
        </p>
      </div>
      </div>
    </center>
  )
}