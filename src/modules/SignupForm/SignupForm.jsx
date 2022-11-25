import { useState } from "react";
import FormLabel from "../../shared/components/FormLabel";
import FormInput from "../../shared/components/FormInput";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./signupForm.module.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordAgain: "",
};

const SignupForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState(initialState);
  const { name, email, password, passwordAgain } = formState;

  const onInputChange = ({ target }) => {
    const { type, name, checked, value } = target;
    const newValue = type === "checkbox" ? checked : value;
    setFormState((prevState) => ({ ...prevState, [name]: newValue }));
  };
  const formReset = () => setFormState(initialState);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (password === passwordAgain) {
      onSubmit({ ...formState });
      formReset();
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormInput
        label={<FormLabel text="Name" accent={true} />}
        type="text"
        name="name"
        value={name}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        placeholder="..."
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FormInput
        label={<FormLabel text="Email" accent={true} />}
        type="email"
        name="email"
        value={email}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        placeholder="your@email.com"
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FormInput
        label={<FormLabel text="Password" accent={true} />}
        type="password"
        name="password"
        value={password}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        placeholder="..."
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FormInput
        label={<FormLabel text="Confirm password" accent={true} />}
        type="password"
        name="passwordAgain"
        value={passwordAgain}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        placeholder="..."
        labelStyle={styles.label}
        inputStyle={styles.lastInput}
      />
      <ButtonUniversal type="submit" text="Register" btnStyles={styles.btn} />
    </form>
  );
};

export default SignupForm;
