import {NavLink} from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? " active" : "");
function Nav() {
  return (
    <nav>
      <NavLink to="/home" className={setActive}>
        Головна
      </NavLink>
      <NavLink to="/attractions" className={setActive}>
        Визначні пам'ятки
      </NavLink>
      <NavLink to="/photos " className={setActive}>
        Фото
      </NavLink>
    </nav>
  );
}
export default Nav;