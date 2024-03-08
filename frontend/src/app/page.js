import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const HeaderTypography = (props) => (
  <h1
    className="text-center mt-5 mb-5"
    style={{ color: "#333332", fontWeight: 700 }}
  >
    {props.children}
  </h1>
);

const CTAButton = (props) => (
  <Button
    className="btn-lg"
    style={{
      padding: "20px 10px",
      fontWeight: 500,
      fontSize: "1.5rem",
      width: "300px",
      color: "#fff",
      border: "0px",
      borderRadius: "30px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      marginLeft: "20px",
      marginRight: "20px",
      backgroundColor: props.backgroundColor,
    }}
    href={props.href}
  >
    {props.children}
  </Button>
);

const FeatureItem = (props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '50px',
      justifyContent: 'space-between',
      textAlign: "left",
      padding: "20px",
      color: "#333",
      borderRadius: "8px",
      minHeight: "300px",
    }}
  >
    {props.children}
  </div>
);

const FeatureGrid = (props) => (
  <Container
    fluid
    style={{
      marginBottom: "5rem",
      backgroundColor: "#f9f6f7",
      padding: "48px",
    }}
  >
    <Row>{props.children}</Row>
  </Container>
);

const Page = () => {
  const features = [
    {
      id: 1,
      title: "Color Palette",
      backgroundColor: "#E0835A",
      route: 'palette',
      description:
        " Let your creativity flourish. Our Color Palette Generator empowers you to craft captivating color schemes that are accessible to everyone. Achieve harmony and inclusivity in your designs effortlessly.",
    },
    {
      id: 2,
      title: "Color Recognition",
      backgroundColor: "#7a765e",
      route: 'recognition',
      description:
        "Decode the colors around you. Our Color Recognition feature identifies and labels colors in real-time, making the world more accessible for those with visual impairments. Experience the power of inclusive design at your fingertips.",
    },
    {
      id: 3,
      title: "Color Simulator",
      backgroundColor: "#39545B",
      route: 'simulator',
      description:
        "Step into another perspective. Our Color Simulator offers a unique glimpse into the world of color-blindness. Experience popular color-blindness types realistically, allowing you to design with empathy and understanding.",
    },
  ];

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "1rem", minHeight: "100vh" }}
    >
      <HeaderTypography>
        True Hue: Colour Accessibility
        <p className="main-description mt-4">
          See the world in every hue: Discover our Color Accessibility App for
          an inclusive and vibrant digital experience.
        </p>
      </HeaderTypography>

      <FeatureGrid>
        {features.map((feature) => (
          <Col xs={12} sm={6} md={4} key={feature.id}>
            <FeatureItem >
              <CTAButton
                backgroundColor={feature.backgroundColor}
                href={`/pages/${feature.route}`}
                >
                {feature.title}
              </CTAButton>
              <p style={{ fontSize: "15px", color: "#6c6768" }}>
                {feature.description}
              </p>
            </FeatureItem>
          </Col>
        ))}
      </FeatureGrid>
    </Container>
  );
};

export default Page;
