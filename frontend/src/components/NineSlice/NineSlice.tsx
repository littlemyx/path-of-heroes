import { CSSProperties } from "react";
import css from "./NineSlice.module.css";
import nineSliceImage from "~/assets/Generated_Image_October_26__2025_-_1_50PM-removebg-preview.png";

// Image dimensions - these match the actual PNG file size
const IMAGE_WIDTH = 881;
const IMAGE_HEIGHT = 283;

interface NineSliceProps {
  width?: string | number;
  height?: string | number;
  sliceTop?: number;
  sliceRight?: number;
  sliceBottom?: number;
  sliceLeft?: number;
  children?: React.ReactNode;
}

export const NineSlice = ({
  width = "400px",
  height = "300px",
  sliceTop = 50,
  sliceRight = 50,
  sliceBottom = 50,
  sliceLeft = 50,
  children
}: NineSliceProps) => {
  const containerStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${nineSliceImage})`,
    backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
  };

  // Calculate positions for slicing
  const rightPos = IMAGE_WIDTH - sliceRight;
  const bottomPos = IMAGE_HEIGHT - sliceBottom;

  const topLeftStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: "0 0",
    width: `${sliceLeft}px`,
    height: `${sliceTop}px`,
  };

  const topStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `-${sliceLeft}px 0`,
    backgroundSize: `calc(${IMAGE_WIDTH}px + 100% - ${sliceLeft + sliceRight}px) ${IMAGE_HEIGHT}px`,
    height: `${sliceTop}px`,
  };

  const topRightStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `-${rightPos}px 0`,
    width: `${sliceRight}px`,
    height: `${sliceTop}px`,
  };

  const leftStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `0 -${sliceTop}px`,
    backgroundSize: `${IMAGE_WIDTH}px calc(${IMAGE_HEIGHT}px + 100% - ${sliceTop + sliceBottom}px)`,
    width: `${sliceLeft}px`,
  };

  const centerStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `-${sliceLeft}px -${sliceTop}px`,
    backgroundSize: `calc(${IMAGE_WIDTH}px + 100% - ${sliceLeft + sliceRight}px) calc(${IMAGE_HEIGHT}px + 100% - ${sliceTop + sliceBottom}px)`,
  };

  const rightStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `-${rightPos}px -${sliceTop}px`,
    backgroundSize: `${IMAGE_WIDTH}px calc(${IMAGE_HEIGHT}px + 100% - ${sliceTop + sliceBottom}px)`,
    width: `${sliceRight}px`,
  };

  const bottomLeftStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `0 -${bottomPos}px`,
    width: `${sliceLeft}px`,
    height: `${sliceBottom}px`,
  };

  const bottomStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `-${sliceLeft}px -${bottomPos}px`,
    backgroundSize: `calc(${IMAGE_WIDTH}px + 100% - ${sliceLeft + sliceRight}px) ${IMAGE_HEIGHT}px`,
    height: `${sliceBottom}px`,
  };

  const bottomRightStyle: CSSProperties = {
    ...backgroundStyle,
    backgroundPosition: `-${rightPos}px -${bottomPos}px`,
    width: `${sliceRight}px`,
    height: `${sliceBottom}px`,
  };

  return (
    <div className={css.nineSliceContainer} style={containerStyle}>
      <div className={css.topLeft} style={topLeftStyle}></div>
      <div className={css.top} style={topStyle}></div>
      <div className={css.topRight} style={topRightStyle}></div>
      <div className={css.left} style={leftStyle}></div>
      <div className={css.center} style={centerStyle}>
        {children && <div className={css.content}>{children}</div>}
      </div>
      <div className={css.right} style={rightStyle}></div>
      <div className={css.bottomLeft} style={bottomLeftStyle}></div>
      <div className={css.bottom} style={bottomStyle}></div>
      <div className={css.bottomRight} style={bottomRightStyle}></div>
    </div>
  );
};
