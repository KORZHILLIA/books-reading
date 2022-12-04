import { memo } from "react";
import PropTypes from "prop-types";
import useForm from "../../shared/hooks/useForm";
import FormInput from "../../shared/components/FormInput";
import FormLabel from "../../shared/components/FormLabel";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./loginForm.module.scss";

const initialState = {
  email: "",
  password: "",
};
const LoginForm = ({ onSubmit }) => {
  const { formState, onInputChange, onFormSubmit } = useForm({
    initialState,
    onSubmit,
    reset: true,
  });
  const { email, password } = formState;
  return (
    <div className={styles.general}>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <FormInput
          label={<FormLabel text="Email" accent={true} />}
          type="email"
          name="email"
          value={email}
          required={true}
          autocomplete="on"
          onChange={onInputChange}
          placeholder="your@email.com"
          labelStyle={styles.label}
          inputStyle={styles.input}
        ></FormInput>
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
        ></FormInput>
        <ButtonUniversal type="submit" text="Login" btnStyles={styles.btn} />
      </form>
    </div>
  );
};

LoginForm.defaultProps = {
  onSubmit: () => {},
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(LoginForm);
