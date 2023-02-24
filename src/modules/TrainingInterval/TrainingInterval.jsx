import { useState, useEffect, useMemo, memo } from "react";
import PropTypes from "prop-types";
import FormInput from "../../shared/components/FormInput";
import DateInputDecorator from "../../shared/components/DateInputDecorator";
import SVGCreator from "../../shared/components/SVGCreator";
import { setLS, getLS } from "../../helpers/LSHandling";
import styles from "./trainingInterval.module.scss";

const initialState = {
  start: "",
  finish: "",
};

const TrainingInterval = ({ setBtn, setTimes }) => {
  const date = useMemo(() => new Date(), []);
  const minDate = useMemo(() => date.toISOString().slice(0, 10), [date]);

  const [state, setState] = useState(initialState);
  const { start, finish } = state;

  const onChange = ({ target }) => {
    const { value, name } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    setLS(name, value);
  };

  useEffect(() => {
    const start = getLS("start");
    const finish = getLS("finish");
    if (start) {
      setState((prevState) => ({ ...prevState, start }));
    }
    if (finish) {
      setState((prevState) => ({ ...prevState, finish }));
    }
    setTimes(state);
    if (start && finish) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [start, finish, setBtn, setTimes, state]);

  return (
    <div className={styles.general}>
      <h2 className={styles.header}>My training</h2>
      <form className={styles.form}>
        <FormInput
          label={!start ? <DateInputDecorator text="Start" /> : null}
          type="date"
          name="start"
          value={start}
          required={true}
          min={minDate}
          onChange={onChange}
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
          onChange={onChange}
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

TrainingInterval.defaultProps = {
  onSubmit: () => {},
};

TrainingInterval.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(TrainingInterval);
