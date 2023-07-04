import { ElementType } from "react";
import { NextButton, NextButtonProps } from "./NextButton";

export type UploadButtonProps<D extends ElementType = "label"> = NextButtonProps<D>;

export const UploadButton = <D extends ElementType = "label">({ ...rest }: UploadButtonProps<D>) => {
  return (
    <>
      <NextButton color="primary" size="large" component="label" {...rest} />
    </>
  );
};
