import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import AddCustomerForm from "../forms/AddCustomerForm";
import AddLoanForm from "../forms/AddLoanForm";
import RecordRepaymentForm from "../forms/RecordRepaymentForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { exportCustomerPDF } from "../../utils/exportPdf";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import SearchIcon from "@mui/icons-material/Search";

export interface Transaction {
  id: number;
  type: "loan" | "repayment";
  item?: string;
  amount: number;
  date?: string;
  dueDate?: string;
  status?: string;
}

export interface Customer {
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

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Suresh",
    contact: { email: "suresh@example.com", phone: "+91 98765 43210" },
    address: "123 Market St, Bhubaneswar, Odisha",
    joinDate: "2024-01-15",
    totalCredit: 5000,
    balance: 500,
    dueDate: "2025-04-28",
    status: "Overdue",
    transactions: [
      {
        id: 101,
        type: "loan",
        item: "Rice (10 kg)",
        amount: 300,
        date: "2025-04-01",
        dueDate: "2025-04-28",
        status: "Overdue",
      },
      { id: 102, type: "repayment", amount: 100, date: "2025-04-15" },
    ],
  },
  {
    id: 2,
    name: "Ramesh",
    contact: { email: "ramesh@example.com", phone: "+91 91234 56789" },
    address: "45 Gandhi Rd, Bhubaneswar, Odisha",
    joinDate: "2024-02-20",
    totalCredit: 2500,
    balance: 0,
    dueDate: "2025-05-10",
    status: "Updated",
    transactions: [
      {
        id: 201,
        type: "loan",
        item: "Wheat Flour",
        amount: 500,
        date: "2025-04-10",
        dueDate: "2025-05-10",
        status: "Paid",
      },
    ],
  },
  {
    id: 3,
    name: "Mahesh",
    contact: { email: "mahesh@example.com", phone: "+91 99876 54321" },
    address: "78 Station Rd, Bhubaneswar, Odisha",
    joinDate: "2023-11-05",
    totalCredit: 1700,
    balance: 250,
    dueDate: "2025-05-02",
    status: "Overdue",
    transactions: [
      {
        id: 301,
        type: "loan",
        item: "Sugar (5 kg)",
        amount: 200,
        date: "2025-04-05",
        dueDate: "2025-05-02",
        status: "Overdue",
      },
      {
        id: 302,
        type: "loan",
        item: "Tea Leaves",
        amount: 50,
        date: "2025-04-15",
        dueDate: "2025-05-15",
        status: "Updated",
      },
    ],
  },
  {
    id: 4,
    name: "Rajesh",
    contact: { email: "rajesh@example.com", phone: "+91 92345 67890" },
    address: "32 Temple St, Bhubaneswar, Odisha",
    joinDate: "2024-03-12",
    totalCredit: 3200,
    balance: 1200,
    dueDate: "2025-06-01",
    status: "Updated",
    transactions: [
      {
        id: 401,
        type: "loan",
        item: "Oil (2 L)",
        amount: 1200,
        date: "2025-05-01",
        dueDate: "2025-06-01",
        status: "Updated",
      },
    ],
  },
  {
    id: 5,
    name: "Yogesh",
    contact: { email: "yogesh@example.com", phone: "+91 93456 78901" },
    address: "56 Park Ave, Bhubaneswar, Odisha",
    joinDate: "2024-05-30",
    totalCredit: 0,
    balance: 0,
    dueDate: "—",
    status: "Updated",
    transactions: [],
  },
  {
    id: 6,
    name: "Anjali",
    contact: { email: "anjali@example.com", phone: "+91 94567 89012" },
    address: "89 Lake View, Bhubaneswar, Odisha",
    joinDate: "2024-04-22",
    totalCredit: 700,
    balance: 300,
    dueDate: "2025-05-07",
    status: "Updated",
    transactions: [
      {
        id: 601,
        type: "loan",
        item: "Spices Set",
        amount: 300,
        date: "2025-04-07",
        dueDate: "2025-05-07",
        status: "Updated",
      },
    ],
  },
  {
    id: 7,
    name: "Priya",
    contact: { email: "priya@example.com", phone: "+91 95678 90123" },
    address: "14 Hill Rd, Bhubaneswar, Odisha",
    joinDate: "2023-12-10",
    totalCredit: 1500,
    balance: 750,
    dueDate: "2025-05-02",
    status: "Overdue",
    transactions: [
      {
        id: 701,
        type: "loan",
        item: "Paneer (1 kg)",
        amount: 500,
        date: "2025-04-02",
        dueDate: "2025-05-02",
        status: "Overdue",
      },
      { id: 702, type: "repayment", amount: 250, date: "2025-04-25" },
    ],
  },
];
type FormType = "customer" | "loan" | "payment" | null;

export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    initialCustomers[0]
  );
  const [expandedForm, setExpandedForm] = useState<FormType>(null);

  const idx = customers.findIndex((c) => c.id === selectedCustomer.id);
  const totalCustomers = customers.length;
  const totalCreditGiven = customers.reduce((sum, c) => sum + c.totalCredit, 0);
  const totalOutstanding = customers.reduce((sum, c) => sum + c.balance, 0);
  const totalOverdue = customers
    .filter((c) => c.status === "Overdue")
    .reduce((sum, c) => sum + c.balance, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(customers);

  const debouncedFilter = useMemo(
    () =>
      debounce((query: string) => {
        const filtered = customers.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCustomers(filtered);
      }, 300),
    [customers]
  );

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-teal-200 dark:bg-teal-100 rounded px-1"
            >
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  useEffect(() => {
    debouncedFilter(searchQuery);
    return debouncedFilter.cancel;
  }, [searchQuery, debouncedFilter]);

  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c);
    setExpandedForm(null);
  };
  const closeForm = () => {
    setExpandedForm(null);
  };

  const handleAddCustomer = (newCust: Customer) => {
    setCustomers((prev) => [...prev, newCust]);
    setSelectedCustomer(newCust);
  };

  const handleAddLoan = (loan: Transaction) => {
    setCustomers((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCustomer.id
          ? {
              ...c,
              transactions: [...c.transactions, loan],
              totalCredit: c.totalCredit + loan.amount,
              balance: c.balance + loan.amount,
              dueDate: loan.dueDate ?? c.dueDate,
              status:
                new Date(loan.dueDate ?? "").getTime() < Date.now()
                  ? "Overdue"
                  : "Updated",
            }
          : c
      );
      const updatedCustomer = updated.find((c) => c.id === selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
      return updated;
    });
  };

  const handleAddRepayment = (repay: Transaction) => {
    setCustomers((prev) => {
      const updated = prev.map((c) =>
        c.id === selectedCustomer.id
          ? {
              ...c,
              transactions: [...c.transactions, repay],
              balance: c.balance - repay.amount,
              status: c.balance - repay.amount > 0 ? "Overdue" : "Updated",
            }
          : c
      );
      const updatedCustomer = updated.find((c) => c.id === selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
      return updated;
    });
  };

  const renderForm = () => {
    if (expandedForm === "customer") {
      return (
        <AddCustomerForm onSubmit={handleAddCustomer} closeModal={closeForm} />
      );
    }
    if (expandedForm === "loan") {
      return <AddLoanForm onSubmit={handleAddLoan} closeModal={closeForm} />;
    }
    if (expandedForm === "payment") {
      return (
        <RecordRepaymentForm
          onSubmit={handleAddRepayment}
          closeModal={closeForm}
        />
      );
    }
    return null;
  };

  const renderCustomerCard = () => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow mb-6 transition-colors">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <AccountCircleIcon className="text-teal-600" fontSize="large" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {selectedCustomer.name}
            </h3>
            <span
              className={`mt-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                selectedCustomer.status === "Overdue"
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-700"
                  : "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-700"
              }`}
            >
              {selectedCustomer.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSelectCustomer(customers[idx - 1])}
            disabled={idx <= 0}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            <ChevronLeftIcon
              className="text-gray-600 dark:text-gray-300"
              fontSize="small"
            />
          </button>
          <button
            onClick={() => handleSelectCustomer(customers[idx + 1])}
            disabled={idx >= customers.length - 1}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            <ChevronRightIcon
              className="text-gray-600 dark:text-gray-300"
              fontSize="small"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 text-sm">
        <div className="space-y-2">
          <p>
            <strong>Joined:</strong> {selectedCustomer.joinDate}
          </p>
          <p>
            <strong>Phone:</strong> {selectedCustomer.contact.phone}
          </p>
          <p>
            <strong>Address:</strong> {selectedCustomer.address}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Total Credit:</strong> ₹{selectedCustomer.totalCredit}
          </p>
          <p>
            <strong>Next Due:</strong> {selectedCustomer.dueDate}
          </p>
        </div>
      </div>

      <button
        onClick={() => exportCustomerPDF(selectedCustomer)}
        className="mt-4 flex items-center bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors"
      >
        <PictureAsPdfIcon fontSize="small" className="mr-2" />
        Export
      </button>

      <hr className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 my-5" />

      <div className="text-sm">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Transactions
        </h4>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
          {selectedCustomer.transactions.map((t) => (
            <li key={t.id} className="py-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {t.type === "loan" ? t.item : "Repayment"}
                </span>
                <span>₹{t.amount}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t.type === "loan" ? `Due ${t.dueDate}` : `On ${t.date}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 transition-colors">
      <main className="container mx-auto px-6 py-8 flex flex-col lg:flex-row lg:space-x-8">
        <section className="flex-1 mb-8 lg:mb-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group relative bg-white/60 dark:bg-gray-600/60 backdrop-blur-md p-5 rounded-xl shadow transition-all">
              <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-teal-500 animate-ping" />
              <div className="flex items-center space-x-3">
                <div className="px-2 py-1 rounded-full bg-teal-100 dark:bg-teal-900 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition-colors">
                  <PeopleIcon className="text-teal-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                    Customers
                  </p>
                  <p className="mt-0.5 text-xl sm:text-2xl font-bold text-teal-900 dark:text-gray-300">
                    {totalCustomers}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/60 dark:bg-gray-600/60 backdrop-blur-md p-5 rounded-xl shadow transition-all">
              <div className="flex items-center space-x-3">
                <div className="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800 transition-colors">
                  <ReceiptLongIcon className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                    Credit Given
                  </p>
                  <p className="mt-0.5 text-xl sm:text-2xl font-bold text-teal-900 dark:text-gray-300">
                    ₹{totalCreditGiven}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/60 dark:bg-gray-600/60 backdrop-blur-md p-5 rounded-xl shadow transition-all">
              <div className="flex items-center space-x-3">
                <div className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <CurrencyRupeeIcon className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                    Outstanding
                  </p>
                  <p className="mt-0.5 text-xl sm:text-2xl font-bold text-teal-900 dark:text-gray-300">
                    ₹{totalOutstanding}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/60 dark:bg-gray-600/60 backdrop-blur-md p-5 rounded-xl shadow transition-all">
              <div className="flex items-center space-x-3">
                <div className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
                  <ReportIcon className="text-red-500 text-xl" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                    Overdue
                  </p>
                  <p className="mt-0.5 text-xl sm:text-2xl font-bold text-teal-900 dark:text-gray-300">
                    ₹{totalOverdue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
            <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300">
              Customers
            </h2>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Enter user name"
                className="pl-10 py-1.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-gray-700 rounded-lg shadow transition-colors">
            <table className="min-w-full">
              <thead className="bg-teal-200 dark:bg-teal-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-teal-700 dark:text-teal-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-teal-700 dark:text-teal-300">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-teal-700 dark:text-teal-300 hidden sm:table-cell">
                    Next Due
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-teal-700 dark:text-teal-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => handleSelectCustomer(c)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <td className="px-6 py-3 font-semibold text-teal-700 dark:text-teal-300">
                      {highlightMatch(c.name, searchQuery)}
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300">
                      ₹{c.balance}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                      {c.dueDate}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                          c.status === "Overdue"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-700"
                            : "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="w-full lg:w-1/3 space-y-6">
          {renderCustomerCard()}

          <div className="flex space-x-6">
            <div
              onClick={() => setExpandedForm("customer")}
              className="flex-1 bg-teal-200 dark:bg-teal-700 hover:dark:bg-teal-600 px-2 py-2 rounded-lg shadow flex justify-center items-center space-x-2 transition-colors cursor-pointer"
            >
              <PersonAddAltIcon className="text-teal-700 dark:text-teal-300" />
              <span className="font-medium text-gray-700 dark:text-gray-100">
                Add Customer
              </span>
            </div>
            <div
              onClick={() => setExpandedForm("loan")}
              className="flex-1 bg-teal-200 dark:bg-teal-700 hover:dark:bg-teal-600 px-2 py-2 rounded-lg shadow flex justify-center items-center space-x-2 transition-colors cursor-pointer"
            >
              <ReceiptLongIcon className="text-teal-700 dark:text-teal-300" />
              <span className="font-medium text-gray-700 dark:text-gray-100">
                Add Loan
              </span>
            </div>
          </div>

          <div
            onClick={() => setExpandedForm("payment")}
            className="bg-teal-200 dark:bg-teal-700 hover:dark:bg-teal-600 px-3 py-2.5 rounded-lg shadow flex justify-center items-center space-x-2 transition-colors cursor-pointer"
          >
            <CurrencyRupeeIcon className="text-teal-700 dark:text-teal-300" />
            <span className="font-medium text-gray-700 dark:text-gray-100">
              Record Repayment
            </span>
          </div>
        </aside>
      </main>

      <Dialog
        open={expandedForm !== null}
        onClose={closeForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {expandedForm === "customer" && "Add New Customer"}
          {expandedForm === "loan" && "Record New Loan"}
          {expandedForm === "payment" && "Record Repayment"}
        </DialogTitle>
        <DialogContent dividers>{renderForm()}</DialogContent>
        <DialogActions>
          <Button onClick={closeForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
