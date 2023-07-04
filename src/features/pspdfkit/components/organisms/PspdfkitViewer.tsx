import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import PSPDFKit, { Instance, StandaloneConfiguration } from "pspdfkit";
import styled from "@emotion/styled";

export type PspdfkitViewerProps = {
  document: StandaloneConfiguration["document"];
};
export type PspdfkitViewerHandler = {
  exportPdf(): Promise<void>;
  exportImage(): Promise<void>;
};

export const PspdfkitViewer = memo(
  forwardRef<PspdfkitViewerHandler, PspdfkitViewerProps>(({ document }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [instance, setInstance] = useState<Instance | null>(null);

    useEffect(() => {
      const container = containerRef.current;

      if (container == null) {
        return;
      }

      (async () => {
        PSPDFKit.unload(container);
        setInstance(null);

        const instance = await PSPDFKit.load({
          container: container,
          document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
          toolbarItems,
          customFonts,
        });

        // 注釈テキストのデフォルトフォントを変更
        const annotationPresets = instance.annotationPresets;
        annotationPresets.text.font = "ipaexg";
        instance.setAnnotationPresets(annotationPresets);
        instance.setAnnotationCreatorName("サンプルユーザ（変更可）");

        setInstance(instance);
      })();

      return () => {
        PSPDFKit.unload(container);
        setInstance(null);
      };
    }, [document]);

    useImperativeHandle(ref, () => ({
      async exportPdf() {
        //await instance!.save();

        const result = await instance!.exportPDF();

        const blob = new Blob([result], { type: "pdf" });
        const link = window.document.createElement("a");
        link.download = "テスト.pdf";
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      },
      async exportImage() {
        const pageInfo = instance!.pageInfoForIndex(0);
        const src = await instance!.renderPageAsImageURL({ width: pageInfo!.width }, 0);

        const link = window.document.createElement("a");
        link.download = "テスト.png";
        link.href = src;
        link.click();
        URL.revokeObjectURL(link.href);
      },
    }));

    return <PspdfkitContainer ref={containerRef} />;
  })
);

const PspdfkitContainer = styled("div")(() => {
  return {
    width: "100%",
    height: "100%",
  };
});

const defaultToolBarItemsSetting = {
  "sidebar-thumbnails": false,
  "sidebar-document-outline": false,
  "sidebar-annotations": false,
  "sidebar-bookmarks": false,
  pager: false,
  "multi-annotations-selection": false,
  pan: true,
  "zoom-out": true,
  "zoom-in": true,
  "zoom-mode": false,
  spacer: true,
  annotate: false,
  ink: false,
  highlighter: false,
  "text-highlighter": false,
  "ink-eraser": false,
  signature: false,
  image: true,
  stamp: false,
  note: false,
  text: true,
  line: true,
  link: false,
  arrow: false,
  rectangle: true,
  ellipse: true,
  polygon: true,
  "cloudy-polygon": false,
  polyline: false,
  print: false,
  "document-editor": false,
  "document-crop": false,
  search: false,
  "export-pdf": false,
  debug: false,
} as const;
const toolbarItems = PSPDFKit.defaultToolbarItems.filter((item) => defaultToolBarItemsSetting[item.type]);

const customFonts = ["ipaexg.ttf"].map(
  (font) =>
    new PSPDFKit.Font({
      name: font,
      callback: (fontFileName) =>
        fetch(`${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}/${fontFileName}`).then(
          (response) => {
            if (response.status === 200) {
              return response.blob();
            } else {
              throw new Error();
            }
          }
        ),
    })
);
