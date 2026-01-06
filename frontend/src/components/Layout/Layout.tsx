import { PropsWithChildren } from "react";

import { NineSlice } from "../NineSlice";
import { Controlls } from "../Controlls";

import scrollPng from "~/assets/header_pergament_4096.png";

import css from "./Lyaout.module.css";

interface LayoutProps {
  title?: string;
}

export const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={css.wrapper}>
      <header>
        <NineSlice bgImage={scrollPng} bgPadding={800} bgPaddingPx={42}>
          <div className={css.title}>{title}</div>
        </NineSlice>
      </header>
      <main className={css.main}>{children}</main>
      <footer>
        <Controlls />
      </footer>
    </div>
  );
};
