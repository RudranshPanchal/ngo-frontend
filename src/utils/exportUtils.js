import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToExcel = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToPDF = (data, filename, title) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  const headers = Object.keys(data[0] || {});
  const rows = data.map(item => headers.map(header => item[header] || ''));
  
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 30,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [147, 51, 234] }
  });
  
  doc.save(`${filename}.pdf`);
};