import { H1, HeroDisplay } from "@atomic";
import { Col, Container, Row } from "react-grid-system";

export default function Home() {
  return (
    <Container>
      <Row align="center" justify="center">
        <Col xs={12}>
          <HeroDisplay center={true}>Hello, Navigator!</HeroDisplay>
        </Col>
      </Row>
      <Row>
        <Col>
          <H1>{"Let's get start?!"}</H1>
        </Col>
      </Row>
    </Container>
  );
}
