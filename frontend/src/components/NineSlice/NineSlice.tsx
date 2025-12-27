import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import css from "./NineSlice.module.css";

type Len = number | string;

interface NineSliceProps {
  /** внутренние отступы */
  bgPadding?: number;
  /** внутренние отступы в пикселях */
  bgPaddingPx?: number;
  /** цвет или фон внутри свитка */
  bgImage: string;
  children?: ReactNode;
}

const toPx = (v: Len) => (typeof v === "number" ? `${v}px` : v);

export function NineSlice({
  bgImage,
  bgPadding,
  bgPaddingPx = bgPadding,
  children
}: PropsWithChildren<NineSliceProps>) {
  const style: CSSProperties = {
    ["--bg-img" as any]: `url(${bgImage})`,
    ["--bg-padding" as any]: bgPadding,
    ["--bg-padding-px" as any]: `${bgPaddingPx}px`
  };

  return (
    <div className={css.nineslice} style={style}>
      {children}
    </div>
  );
}
