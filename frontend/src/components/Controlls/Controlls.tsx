import { useNavigate } from "react-router-dom";

import { Button } from "@uikit";
import { useRoutes } from "@hooks";

import css from "./Controlls.module.css";

export const Controlls = () => {
  const routes = useRoutes();

  const navigate = useNavigate();

  return (
    <div className={css.wrapper}>
      {routes.map(route => (
        <Button key={route.path} onClick={() => navigate(route.path)}>
          {route.path.replace("/", "") || "home"}
        </Button>
      ))}
    </div>
  );
};
