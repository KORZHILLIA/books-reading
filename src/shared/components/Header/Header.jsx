import { memo } from "react";
import useBreakpoints from "../../hooks/useBreakpoints";
import authSelectors from "../../../redux/auth/auth-selectors";
import HeaderMenu from "../../../modules/HeaderMenu";
import UserLabel from "../../../modules/UserLabel";
import styles from "./header.module.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = useSelector(authSelectors.auth);
  const { isLoggedIn } = auth.user;
  const { bigger768px } = useBreakpoints();
  return (
    <header
      style={{ justifyContent: isLoggedIn ? "space-between" : "center" }}
      className={styles.header}
    >
      <p className={styles.headerLabel}>BR</p>
      {isLoggedIn && bigger768px ? <UserLabel /> : null}
      {isLoggedIn ? <HeaderMenu /> : null}
    </header>
  );
};

export default memo(Header);
