import React from "react";
import PDFReader from "../components/ReaderPdf";
import styles from "./StandardDetailPage.module.css"
import { useLocation } from 'react-router-dom';
import Chat from "../components/Chat component/Chat"

const StandardDetailPage = () => {
    const location = useLocation();
    const pdfUrl = location.state || {};
    const { botMessage, userQuestion } = location.state || {};
    return (
        <div className={styles.container}>
            <div className={styles.leftHalf}>
                <PDFReader url={pdfUrl}/> {/* Render your PDFReader component here */}
            </div>
            <div className={styles.rightHalf}>
                {/* Your chat component will go here */}
                <Chat botMessage={botMessage} userQuestion={userQuestion}/>
            </div>
        </div>
    )
}
export default StandardDetailPage;