import { Col, Row } from "react-grid-system";
import { ModalStyled, ModalStyledProps } from "./modal.mol.style";

type ModalProps = ModalStyledProps;

export const Modal: React.FC<ModalProps> = props => {
  return (
    <ModalStyled.Wrapper>
      <Row justify="center" align="center">
        <Col xs={10} sm={8} md={6} lg={4}>
          {props.children}
        </Col>
      </Row>
    </ModalStyled.Wrapper>
  );
};
