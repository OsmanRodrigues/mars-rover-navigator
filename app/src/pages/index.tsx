import { H1, HeroDisplay } from "@atomic";
import { Separator } from "@atomic/spacer.atm";
import { Col, Container, Row } from "react-grid-system";

export default function Home() {
  return (
    <Container>
      <Row align="center" justify="center">
        <Col xs={12}>
          <HeroDisplay center={true}>{"Hello, Navigator!"}</HeroDisplay>
        </Col>
      </Row>
      <Separator />
      <Row>
        <Col xs={12}>
          <H1 center={true}>{"Click to navigate"}</H1>
        </Col>
      </Row>
    </Container>
  );
}
