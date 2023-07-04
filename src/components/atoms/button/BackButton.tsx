import { useTheme } from "@mui/material";
import { BasicButton, BasicButtonProps } from "./BasicButton";

export type BackButtonProps = BasicButtonProps;

export const BackButton = ({ ...rest }: BackButtonProps) => {
  const theme = useTheme();
  return (
    <BasicButton
      sx={{ backgroundColor: theme.palette.grey[600], ":hover": { backgroundColor: theme.palette.grey[700] } }}
      {...rest}
    />
  );
};
