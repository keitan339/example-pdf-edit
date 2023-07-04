import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PspdfkitViewer, PspdfkitViewerHandler } from "../organisms/PspdfkitViewer";
import { Box, Grid, Step, StepContent, StepLabel, Stepper, styled } from "@mui/material";
import { NextButton } from "../../../../components/atoms/button/NextButton";
import { BackButton } from "../../../../components/atoms/button/BackButton";
import { UploadButton } from "../../../../components/atoms/button/UploadButton";

export const PspdfkitPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [document, setDocument] = useState<ArrayBuffer | null>(null);
  const pdfRef = useRef<PspdfkitViewerHandler>(null);

  useEffect(() => {
    if (document == null || document.byteLength === 0) {
      setActiveStep(0);
    }
  }, [document]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null) {
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocument(reader.result as ArrayBuffer);
        setActiveStep((current) => ++current);
      };
      reader.readAsArrayBuffer(file);
    });
    event.target.value = "";
  };

  const handleExportPdfClick = () => {
    pdfRef.current?.exportPdf();
  };

  const handleExportImageClick = () => {
    pdfRef.current?.exportImage();
  };

  return (
    <PageContainer>
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>ファイル選択</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <UploadButton>
                    ファイル選択
                    <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
                  </UploadButton>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>編集</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Box sx={{ height: "500px" }}>
                {document != null && <PspdfkitViewer document={document} ref={pdfRef} />}
              </Box>
              <Box sx={{ paddingTop: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <BackButton
                      onClick={() => {
                        setActiveStep((current) => --current);
                      }}
                    >
                      戻る
                    </BackButton>
                  </Grid>
                  <Grid item xs={2}>
                    <NextButton
                      onClick={() => {
                        setActiveStep((current) => ++current);
                      }}
                    >
                      確定
                    </NextButton>
                  </Grid>
                </Grid>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>ダウンロード</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <BackButton
                    onClick={() => {
                      setActiveStep((current) => --current);
                    }}
                  >
                    戻る
                  </BackButton>
                </Grid>
                <Grid item xs={2}>
                  <NextButton onClick={handleExportPdfClick}>Export PDF</NextButton>
                </Grid>
                <Grid item xs={2}>
                  <NextButton onClick={handleExportImageClick}>Export Image</NextButton>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </PageContainer>
  );
};

const PageContainer = styled("div")(() => {
  return {
    width: "100%",
    height: "100%",
  };
});
