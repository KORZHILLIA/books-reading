import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import SVGCreator from "../../shared/components/SVGCreator";
import UserLabel from "../UserLabel";
import { logoutUser } from "../../redux/auth/auth-operations";
import styles from "./headerMenu.module.scss";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const chooseClassName = ({ isActive }) => {
    return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
  };
  const { bigger768px } = useBreakpoints();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.general}>
      <div className={styles.nav}>
        <NavLink to="/training" className={chooseClassName}>
          <SVGCreator iconName="library" width={22} height={22} />
        </NavLink>
        <NavLink to="/home" className={chooseClassName}>
          <SVGCreator iconName="home" width={22} height={22} />
        </NavLink>
      </div>
      <div className={styles.auth}>
        {bigger768px ? null : <UserLabel />}
        <span className={styles.logout} onClick={logout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default HeaderMenu;
