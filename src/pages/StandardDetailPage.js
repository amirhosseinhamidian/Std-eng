import React from "react";
import PDFReader from "../components/ReaderPdf";
import styles from "./StandardDetailPage.module.css"

const StandardDetailPage = () => {
    const pdfUrl = '/test.pdf';
    return (
        <div className={styles.container}>
            <div className={styles.leftHalf}>
                <PDFReader url={pdfUrl}/> {/* Render your PDFReader component here */}
            </div>
            <div className={styles.rightHalf}>
                {/* Your chat component will go here */}
            
            </div>
        </div>
    )
}
export default StandardDetailPage;