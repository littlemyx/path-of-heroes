import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
}

export const Button = ({
  children,
  onClick
}: PropsWithChildren<ButtonProps>) => {
  return <button onClick={onClick}>{children}</button>;
};
