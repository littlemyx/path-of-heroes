import { PropsWithChildren } from "react";

import css from "./List.module.css";

export const List = ({ children }: PropsWithChildren) => {
  return (
    <div className={css.wrapper}>
      <ul>{children}</ul>
    </div>
  );
};
