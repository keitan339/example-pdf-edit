import { Button, ButtonProps, ButtonTypeMap } from "@mui/material";
import { ElementType } from "react";

export type BasicButtonProps<D extends ElementType = ButtonTypeMap["defaultComponent"]> = ButtonProps<D>;

export const BasicButton = <D extends ElementType = ButtonTypeMap["defaultComponent"]>({
  ...rest
}: BasicButtonProps<D>) => {
  return <Button variant="contained" fullWidth sx={{ textTransform: "none" }} {...rest} />;
};
