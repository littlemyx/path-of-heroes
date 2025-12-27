import { useNavigate, useLocation } from "react-router-dom";

import { useRoutes } from "@hooks";
import { NineSlice } from "../NineSlice";

import pergamentBg from "~/assets/pergament_4096.png";

import css from "./Controlls.module.css";

// Russian labels for navigation
const routeLabels: Record<string, string> = {
  "/arena": "ФАЙТ",
  "/map": "КАРТА",
  "/chat": "ЧАТ",
  "/character": "ПЕРСОНАЖ"
};

export const Controlls = () => {
  const routes = useRoutes();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NineSlice bgImage={pergamentBg} bgPadding={260} bgPaddingPx={10}>
      <div className={css.wrapper}>
        {routes.map(route => {
          const isActive = location.pathname === route.path;
          const label = routeLabels[route.path] || route.path.replace("/", "");

          return (
            <button
              key={route.path}
              className={`${css.navButton} ${isActive ? css.active : ""}`}
              onClick={() => navigate(route.path)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </NineSlice>
  );
};
