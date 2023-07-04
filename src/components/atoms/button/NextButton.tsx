import { ElementType } from "react";
import { BasicButton, BasicButtonProps } from "./BasicButton";
import { ButtonTypeMap } from "@mui/material";

export type NextButtonProps<D extends ElementType = ButtonTypeMap["defaultComponent"]> = BasicButtonProps<D>;

export const NextButton = <D extends ElementType = ButtonTypeMap["defaultComponent"]>({
  ...rest
}: NextButtonProps<D>) => {
  return <BasicButton color="primary" {...rest} />;
};
