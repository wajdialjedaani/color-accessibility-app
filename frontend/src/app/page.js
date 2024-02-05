import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const HeaderTypography = (props) => (
  <h1 className="text-center mt-5 mb-5" style={{ color: '#333332', fontWeight: 700 }}>
    {props.children}
  </h1>
);

const CTAButton = (props) => (
  <Button
    className="btn-lg"
    style={{
      padding: '13px 25px',
      fontWeight: 500,
      fontSize: '1.1rem',
      color: '#fff',
      border: '0px',
      borderRadius: '30px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
      marginLeft: '60px',
      marginRight: '60px',
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
      textAlign: 'left',
      padding: '20px',
      color: '#333',
      borderRadius: '8px',
      backgroundColor: '#cdd4c5',
    }}
  >
    {props.children}
  </div>
);

const FeatureGrid = (props) => (
  <Container fluid style={{ marginBottom: '5rem', backgroundColor: '#f9f6f7', padding: '48px' }}>
    <Row>{props.children}</Row>
  </Container>
);

const Page = () => {
  const features = [
    {
      id: 1,
      title: 'Color Palette',
      description:
        ' Let your creativity flourish. Our Color Palette Generator empowers you to craft captivating color schemes that are accessible to everyone. Achieve harmony and inclusivity in your designs effortlessly.',
    },
    {
      id: 2,
      title: 'Color Recognition',
      description:
        'Decode the colors around you. Our Color Recognition feature identifies and labels colors in real-time, making the world more accessible for those with visual impairments. Experience the power of inclusive design at your fingertips.',
    },
    {
      id: 3,
      title: 'Color Simulator',
      description:
        'Step into another perspective. Our Color Simulator offers a unique glimpse into the world of color-blindness. Experience popular color-blindness types realistically, allowing you to design with empathy and understanding.',
    },
  ];

  return (
    <Container fluid className="d-flex flex-column align-items-center" style={{ marginTop: '1rem', minHeight: '100vh' }}>
      <HeaderTypography>
        True Hue: Colour Accessibility
        <p className="main-description mt-4">
          See the world in every hue: Discover our Color Accessibility App for an inclusive and vibrant digital experience.
        </p>
      </HeaderTypography>

      <Col className="justify-content-center mt-4">
        <CTAButton backgroundColor="#E0835A" href="/pages/palette">
          Color Palette
        </CTAButton>
        <CTAButton backgroundColor="#7a765e" href="/pages/recognition">
          Color Recognition
        </CTAButton>
        <CTAButton backgroundColor="#39545B" href="/pages/simulator">
          Color Simulator
        </CTAButton>
      </Col>

      <FeatureGrid>
        {features.map((feature) => (
          <Col xs={12} sm={6} md={4} key={feature.id}>
            <FeatureItem>
              <p className="mb-2">{feature.title}</p>
              <p style={{ fontSize: '15px', color: '#6c6768' }}>{feature.description}</p>
            </FeatureItem>
          </Col>
        ))}
      </FeatureGrid>
    </Container>
  );
};

export default Page;
