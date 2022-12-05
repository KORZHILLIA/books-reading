import { useSelector } from "react-redux";
import authSelectors from "../../redux/auth/auth-selectors";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import styles from "./userLabel.module.scss";

const UserLabel = () => {
  const auth = useSelector(authSelectors.auth);
  const { name } = auth.user;
  const firstUserNameLetter = name[0];
  const { bigger768px } = useBreakpoints();
  return (
    <div className={styles.general}>
      <span className={styles.letter}>{firstUserNameLetter}</span>
      {bigger768px ? <span className={styles.name}>{name}</span> : null}
    </div>
  );
};

export default UserLabel;
