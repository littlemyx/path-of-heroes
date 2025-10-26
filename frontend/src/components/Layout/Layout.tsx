import { PropsWithChildren } from "react";

import { Controlls } from "../Controlls";

import css from "./Lyaout.module.css";

interface LayoutProps {
  title?: string;
}

export const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={css.wrapper}>
      <header>
        <h1>{title}</h1>
      </header>
      <main className={css.main}>{children}</main>
      <footer>
        <Controlls />
      </footer>
    </div>
  );
};
