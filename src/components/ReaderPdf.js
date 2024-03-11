import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ChevronDown, RotateCw, SearchIcon } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FullscreenPDF from "./FullscreenPdf";
import styles from "./ReaderPdf.module.css"
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import {CircularProgress} from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const RenderPDF = ({ url }) => {
  const [numberPages, setNumberPages] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [renderedScale, setRenderedScale] = useState(null);
  const { width, ref } = useResizeDetector();
  const isLoading = renderedScale !== null && renderedScale !== scale;

  const handleOptionSelect = (option) => {
    const newScale = parseFloat(option.target.value);
    setScale(newScale);
    setRenderedScale(null);
  };

  const CustomPageLoadValidator = z.object({
    index: z
      .string()
      .refine((val) => Number(val) > 0 && Number(val) <= numberPages),
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      index: "1",
    },
    resolver: zodResolver(CustomPageLoadValidator),
  });


  const handlePageSubmit = ({ index }) => {
    setCurrPage(Number(index));
    setValue("index", String(index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.horizontalNavItems}>
          <button
            className={styles.pageButton}
            aria-label="previous page"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("index", String(currPage - 1));
            }}
          >
            <ChevronLeft className={styles.iconSizeSmall} />
          </button>
          <div className={styles.horizontalNavItems}>
            <input
              {...register("index")}
              type="number"
              className={styles.inputPage}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
                // Prevent typing of negative sign
                if (event.key === "-" || event.key === "+") {
                  event.preventDefault();
                }

                // Prevent decrementing below 1
                const value = Number(event.target.value);
                if (event.key === "ArrowDown" && (value <= 1 || isNaN(value))) {
                  event.preventDefault();
                }

                // Prevent incrementing above the maximum number of pages
                if (
                  event.key === "ArrowUp" &&
                  (value >= numberPages || isNaN(value))
                ) {
                  event.preventDefault();
                }
              }}
            />
            <p className={styles.horizontalSpacingSmallTextZinc}>
              <span className={styles.subduedText}>/</span>
              <span>
                {numberPages ? (
                  numberPages
                ) : (
                  <span className={styles.spinAnimation}>
                    <span className={styles.smallSquare} />
                  </span>
                )}
              </span>
            </p>
            <button
              className={styles.pageButton}
              aria-label="next page"
              disabled={numberPages === undefined || currPage === numberPages}
              onClick={() => {
                setCurrPage((prev) =>
                  prev + 1 > numberPages ? numberPages : prev + 1
                );
                setValue("index", String(currPage + 1));
              }}
            >
              <ChevronRight className={styles.iconSizeSmall} />
            </button>
            <button
              aria-label="rotate"
              className={styles.pageButton}
              onClick={() => setRotation((prev) => prev + 90)}
            >
              <RotateCw className={styles.iconSizeSmall} />
            </button>
            <FullscreenPDF url={url} />
          </div>
        </div>
        <div className={styles.horizontalSpacingDouble}>
          <button
            aria-label="zoom in/out"
            className={styles.pageButtonWithoutCursor}
          >
            <SearchIcon className={styles.iconSizeSmall} />
          </button>
          <select className={styles.dropdown}
            value={scale}
            onChange={handleOptionSelect}
          >
            <option value="1">100%</option>
            <option value="1.5">150%</option>
            <option value="2">200%</option>
            <option value="2.5">250%</option>
          </select>
        </div>
      </div>

      <div className={styles.fullHeightWidthFlex}>
        <div ref={ref}>
            <Document
              file={url}
              loading={
                <div className={styles.progressbarContainer}>
                  <CircularProgress 
                    className={styles.loadingbar}
                    variant="indeterminate"
                    size={40} // Adjust the size of the circular progress
                    thickness={5} // Adjust the thickness of the circular progress
                />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumberPages(numPages)}
              onLoadError={(error) => {
                console.log('Error loading PDF:', error);
              }}
              className={styles.maxHeightFull}
            >
              <Page
                key={"page_scale" + currPage + renderedScale}
                className={isLoading ? "hidden" : ""}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                width={width ? width : 1}
                loading={
                  <div className={styles.centerLoading}>
                    <div className={styles.loadingSpinner} />
                  </div>}
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
      </div>
    </div>
  );
};

export default RenderPDF;