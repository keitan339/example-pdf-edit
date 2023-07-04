import { Container } from "@mui/material";
import { ReactNode } from "react";

export type BaseTemplateProps = {
  children: ReactNode;
};

export const BaseTemplate = ({ children }: BaseTemplateProps) => {
  return (
    <>
      <Container sx={{ paddingTop: "1rem" }}>{children}</Container>
    </>
  );
};
