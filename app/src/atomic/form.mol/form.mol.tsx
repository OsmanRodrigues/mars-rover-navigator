import { FormStyled } from "./form.mol.style";

export const Form: React.FC = ({ children }) => {
  return <FormStyled.Wrapper>{children}</FormStyled.Wrapper>;
};
