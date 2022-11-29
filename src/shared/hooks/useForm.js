import { useState } from "react";

const useForm = ({
  initialState,
  patterns = null,
  onSubmit,
  doublePassword = false,
  reset,
}) => {
  const [formState, setFormState] = useState(initialState);

  const onInputChange = ({ target }) => {
    const { type, name, checked, value } = target;
    const newValue = type === "checkbox" ? checked : value;
    setFormState((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const checkWarnOnBlur = ({ target }) => {
    const { name, value } = target;
    if (!value) {
      return;
    }
    const { regExp } = patterns[name];
    const isWarnPresent = formState.warns?.includes(name);
    if (isWarnPresent && regExp.test(value)) {
      const newWarns = [...formState.warns];
      const requiredIdx = newWarns.indexOf(name);
      newWarns.splice(requiredIdx, 1);
      setFormState((prevState) => ({ ...prevState, warns: newWarns }));
    }
    if (!isWarnPresent && !regExp.test(value)) {
      setFormState((prevState) => ({
        ...prevState,
        warns: [...prevState.warns, name],
      }));
    }
  };

  const checkPasswordEqualityOnBlur = () => {
    const { password, passwordAgain } = formState;
    const passwordsEqual = password === passwordAgain;
    setFormState((prevState) => ({ ...prevState, passwordsEqual }));
  };

  const formReset = () => setFormState(initialState);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const { passwordsEqual } = formState;
    if (doublePassword && !passwordsEqual) {
      return;
    }
    if (formState.warns?.length) {
      return;
    } else {
      onSubmit({ ...formState });
    }
    if (reset) {
      formReset();
    }
  };

  return {
    formState,
    onInputChange,
    checkWarnOnBlur,
    checkPasswordEqualityOnBlur,
    onFormSubmit,
  };
};

export default useForm;
