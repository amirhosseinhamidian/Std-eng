import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Expand, Loader2 } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/Dialog"
import styles from "./FullscreenPdf.module.css"
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const FullscreenPDF = ({url}) => {
    const [numberPages, setNumberPages] = useState(null);
    const { width, ref } = useResizeDetector();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(Visibility) => {
                if (!Visibility) {
                    setIsOpen(Visibility);
                }
            }}
        >
            <DialogTrigger asChild>
                <button
                    aria-label="full screen"
                    className={styles.expandBtn}
                    onClick={() => setIsOpen(true)}
            >
                <Expand className={styles.smallWH}/>
                </button>
            </DialogTrigger>
            <DialogContent className={styles.fullPage}>
                <div ref={ref}>
                    <Document
                       file={url}
                       loading={
                           <div className={styles.centerLoading}>
                               <Loader2 className={styles.loadingSpinner}/>
                           </div>
                       }
                       onLoadSuccess={({numPages}) => setNumberPages(numPages)}
                       onLoadError={() => {
                        console.error("Error loading PDF:", error)
                       }}
                       className={styles.document}   
                    >
                       {numberPages &&
                            Array.from(Array(numberPages), (_, index) => (
                        <Page
                        key={index}
                        pageNumber={index + 1}
                        scale={1}
                        width={width || undefined}
                        />
                    ))}
                    </Document>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FullscreenPDF;