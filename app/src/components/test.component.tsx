import styled from 'styled-components';

const Div = styled.div`
  border: 1px solid red;
`;

export const Wrapper: React.FC = ({ children }) => {
  return <Div>{children}</Div>;
};
