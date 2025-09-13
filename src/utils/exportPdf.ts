import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

interface Transaction {
    id: number;
    type: string;
    item?: string;
    amount: number;
    date?: string;
    dueDate?: string;
    status?: string;
}

interface Customer {
    id: number;
    name: string;
    contact: { email: string; phone: string };
    address: string;
    joinDate: string;
    totalCredit: number;
    balance: number;
    dueDate: string;
    status: string;
    transactions: Transaction[];
}

export function exportCustomerPDF(customer: Customer) {
    try {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor("#0f766e");
        doc.text(`Customer Report`, 14, 20);

        doc.setFontSize(14);
        doc.setTextColor("#000000");
        doc.text(`${customer.name}`, 14, 30);

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const infoY = 38;
        const lineHeight = 6;
        const customerInfo = [
            `Phone: ${customer.contact.phone}`,
            `Email: ${customer.contact.email}`,
            `Address: ${customer.address}`,
            `Join Date: ${customer.joinDate}`,
            `Total Credit: ${customer.totalCredit}`,
            `Balance: ${customer.balance}`,
            `Status: ${customer.status}`,
        ];
        customerInfo.forEach((text, i) => {
            doc.text(text, 14, infoY + i * lineHeight);
        });

        const tableStartY = infoY + customerInfo.length * lineHeight + 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Transaction History", 14, tableStartY - 5);

        const tableData = customer.transactions.map((t) => [
            t.type === "loan" ? t.item ?? "" : "Repayment",
            `${t.amount}`,
            t.type === "loan" ? t.dueDate ?? "" : t.date ?? "",
            t.status ?? "",
        ]);

        autoTable(doc, {
            startY: tableStartY,
            head: [["Item", "Amount", "Date", "Status"]],
            body: tableData,
            theme: "grid",
            headStyles: {
                fillColor: [13, 148, 136],
                textColor: 255,
                fontStyle: "bold",
            },
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            alternateRowStyles: { fillColor: [240, 253, 250] },
        });

        const fileName = `${customer.name}_.pdf`;
        doc.save(fileName);

        toast.success(`Exported PDF as ${fileName}`);
    } catch (error) {
        console.error("PDF export failed:", error);
        toast.error("Failed to export PDF!");
    }
}
