import { memo } from "react";
import { Link } from "react-router-dom";
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
      {isLoggedIn ? (
        <Link to="/home" className={styles.headerLabel}>
          BR
        </Link>
      ) : (
        <p className={styles.headerLabel}>BR</p>
      )}
      {isLoggedIn && bigger768px ? <UserLabel /> : null}
      {isLoggedIn ? <HeaderMenu /> : null}
    </header>
  );
};

export default memo(Header);
