import { H1, HeroDisplay } from "@atomic";
import { Separator } from "@atomic/spacer.atm";
import { NavigateForm } from "@components";
import { Col, Container, Row } from "react-grid-system";

export const Home: React.FC = () => {
  return (
    <Container>
      <Row align="center" justify="center">
        <Col xs={12}>
          <HeroDisplay center={true}>{"Hello, Navigator!"}</HeroDisplay>
        </Col>
      </Row>
      <Separator size="large" />
      <Row>
        <Col xs={12}>
          <H1 center={true}>{"Enter infos and navigate"}</H1>
        </Col>
      </Row>
      <Separator size="small" />
      <Row justify="center">
        <Col md={8}>
          <NavigateForm />
        </Col>
      </Row>
      <Separator size="large" />
    </Container>
  );
};

export default Home;
