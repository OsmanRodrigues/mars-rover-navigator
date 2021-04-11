import { FormStyled } from "@atomic/form.mol";
import { Input } from "@atomic/form.mol/input.atm";
import { useForm } from "react-hook-form";

export const NavigateForm: React.FC = ({ children }) => {
  const { register, handleSubmit } = useForm();

  const submitRover = formData => {
    console.log(formData);
  };

  return (
    <FormStyled.Wrapper>
      <Input label="Rover name" name="roverName" register={register} />
      <button onClick={handleSubmit(submitRover)}>Ok</button>
    </FormStyled.Wrapper>
  );
};
