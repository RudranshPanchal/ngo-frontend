import { useState, useRef } from "react";
import { marked } from "marked";
import { generateReportAPI, downloadPDFAPI } from "../services/auditReportService";

export const useReportGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [isReportReady, setIsReportReady] = useState(false);
    const [htmlReport, setHtmlReport] = useState("");
    const formDataRef = useRef({});

    const handleGenerateReport = async (formData) => {
        setLoading(true);
        setIsReportReady(false);
        formDataRef.current = formData;

        try {
            const data = await generateReportAPI(formData);

            if (data?.reportText) {
                const html = marked.parse(data.reportText);
                setHtmlReport(html);
                setIsReportReady(true);
            } else {
                console.error("❌ Missing reportText from API:", data);
                setHtmlReport("<p>Report generation failed. Try again.</p>");
                setIsReportReady(false);
            }

        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };


    const downloadPDF = async () => {
        const payload = { ...formDataRef.current, reportHTML: htmlReport };
        const blob = await downloadPDFAPI(payload);
        const url = URL.createObjectURL(blob);

        // Sanitize NGO name for filename
        const ngoName = formDataRef.current.ngoName || "NGO";
        const financialYear = formDataRef.current.financialYear || "YYYY-YYYY";

        const safeName = ngoName.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
        const filename = `${safeName}_Audit_Report_${financialYear}.pdf`;

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return { handleGenerateReport, downloadPDF, loading, isReportReady };
};
