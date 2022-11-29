import { memo } from "react";
import PropTypes from "prop-types";
import FormLabel from "../../shared/components/FormLabel";
import FormInput from "../../shared/components/FormInput";
import FieldAcceptSign from "../../shared/FieldAcceptSign";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import patterns from "./patterns";
import useForm from "../../shared/hooks/useForm";
import styles from "./signupForm.module.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordAgain: "",
  passwordsEqual: null,
  warns: [],
};

const SignupForm = ({ onSubmit }) => {
  const {
    formState,
    onInputChange,
    checkWarnOnBlur,
    checkPasswordEqualityOnBlur,
    onFormSubmit,
  } = useForm({
    initialState,
    patterns,
    onSubmit,
    doublePassword: true,
    reset: true,
  });

  const { name, email, password, passwordAgain, passwordsEqual, warns } =
    formState;

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <FormInput
        label={<FormLabel text="Name" accent={true} />}
        type="text"
        name="name"
        value={name}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        onBlur={checkWarnOnBlur}
        placeholder="..."
        labelStyle={styles.label}
        inputStyle={styles.input}
      >
        {name && patterns.name.regExp.test(name) ? (
          <FieldAcceptSign markStyles={styles.accept} />
        ) : null}
        <p className={warns.includes("name") ? styles.warn : styles.warnHidden}>
          4 to 30 characters (latin letters, numbers, underscore)
        </p>
      </FormInput>
      <FormInput
        label={<FormLabel text="Email" accent={true} />}
        type="email"
        name="email"
        value={email}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        onBlur={checkWarnOnBlur}
        placeholder="your@email.com"
        labelStyle={styles.label}
        inputStyle={styles.input}
      >
        {email && patterns.email.regExp.test(email) ? (
          <FieldAcceptSign markStyles={styles.accept} />
        ) : null}
        <p
          className={warns.includes("email") ? styles.warn : styles.warnHidden}
        >
          Top level domain must be 2 to 4 characters
        </p>
      </FormInput>
      <FormInput
        label={<FormLabel text="Password" accent={true} />}
        type="password"
        name="password"
        value={password}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        onBlur={checkWarnOnBlur}
        placeholder="..."
        labelStyle={styles.label}
        inputStyle={styles.input}
      >
        {password && patterns.password.regExp.test(password) ? (
          <FieldAcceptSign markStyles={styles.accept} />
        ) : null}
        <p
          className={
            warns.includes("password")
              ? styles.passwordWarn
              : styles.passwordWarnHidden
          }
        >
          6 to 10 characters (at least one upper case letter, one lower case
          letter, and one numeric digit)
        </p>
      </FormInput>
      <FormInput
        label={<FormLabel text="Confirm password" accent={true} />}
        type="password"
        name="passwordAgain"
        value={passwordAgain}
        required={true}
        autocomplete="off"
        onChange={onInputChange}
        onBlur={checkPasswordEqualityOnBlur}
        placeholder="..."
        labelStyle={styles.label}
        inputStyle={styles.input}
      >
        {password && password === passwordAgain ? (
          <FieldAcceptSign markStyles={styles.accept} />
        ) : null}
        <p
          className={
            passwordsEqual !== null && !passwordsEqual
              ? styles.warn
              : styles.warnHidden
          }
        >
          Please, repeate password correctly
        </p>
      </FormInput>
      <ButtonUniversal type="submit" text="Register" btnStyles={styles.btn} />
    </form>
  );
};

SignupForm.defaultProps = {
  onSubmit: () => {},
};

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(SignupForm);
