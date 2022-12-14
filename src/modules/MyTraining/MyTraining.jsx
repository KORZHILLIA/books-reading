import { useMemo } from "react";
import useForm from "../../shared/hooks/useForm";
import FormInput from "../../shared/components/FormInput";
import DateInputDecorator from "../../shared/components/DateInputDecorator";
import SVGCreator from "../../shared/components/SVGCreator";
import styles from "./myTraining.module.scss";

const initialState = {
  start: "",
  finish: "",
};

const MyTraining = ({ onSubmit }) => {
  const date = new Date();
  const minDate = useMemo(() => date.toISOString().slice(0, 10), [date]);

  const { formState, onInputChange, onFormSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { start, finish } = formState;
  return (
    <div className={styles.general}>
      <h2 className={styles.header}>My training</h2>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <FormInput
          label={!start ? <DateInputDecorator text="Start" /> : null}
          type="date"
          name="start"
          value={start}
          required={true}
          min={minDate}
          onChange={onInputChange}
          inputStyle={styles.input}
        >
          <div className={styles.arrow}>
            <SVGCreator iconName="triangle" width={13} height={7} />
          </div>
          {start ? <p className={styles.choice}>{start}</p> : null}
        </FormInput>
        <FormInput
          label={<DateInputDecorator text="Finish" />}
          type="date"
          name="finish"
          value={finish}
          required={true}
          min={minDate}
          onChange={onInputChange}
          inputStyle={styles.input}
        >
          <div className={styles.arrow}>
            <SVGCreator iconName="triangle" width={13} height={7} />
          </div>
          {finish ? <p className={styles.choice}>{finish}</p> : null}
        </FormInput>
      </form>
    </div>
  );
};

export default MyTraining;
