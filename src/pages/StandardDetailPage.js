import React from "react";
import PDFReader from "../components/ReaderPdf";
import styles from "./StandardDetailPage.module.css"
import { useLocation } from 'react-router-dom';

const StandardDetailPage = () => {
    console.log("here")
    const location = useLocation();
    const pdfUrl = location.state || {};
    console.log("url ", pdfUrl);
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