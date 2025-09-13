import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Transaction } from "../pages/Board";

type Props = {
  onSubmit: (loan: Transaction) => void;
  closeModal?: () => void;
};

type LoanFormInputs = {
  item: string;
  amount: string;
  dueDate: string;
};

export default function AddLoanForm({ onSubmit, closeModal }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanFormInputs>();

  const handleFormSubmit = (data: LoanFormInputs) => {
    const amount = parseFloat(data.amount);
    const now = Date.now();
    const dueTime = new Date(data.dueDate).getTime();

    onSubmit({
      id: Date.now(),
      type: "loan",
      item: data.item,
      amount,
      date: new Date().toISOString().split("T")[0],
      dueDate: data.dueDate,
      status: dueTime < now ? "Overdue" : "Up-to-date",
    });

    toast.success("Loan added successfully");
    closeModal?.();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register("item", { required: "Item is required" })}
        placeholder="Item"
        className="w-full border p-2 rounded"
      />
      {errors.item && (
        <p className="text-red-500 text-sm">{errors.item.message}</p>
      )}

      <input
        type="number"
        {...register("amount", {
          required: "Amount is required",
          min: { value: 1, message: "Enter valid amount" },
        })}
        placeholder="Amount"
        className="w-full border p-2 rounded"
      />
      {errors.amount && (
        <p className="text-red-500 text-sm">{errors.amount.message}</p>
      )}

      <input
        type="date"
        {...register("dueDate", { required: "Due date is required" })}
        className="w-full border p-2 rounded"
      />
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        Add Loan
      </button>
    </form>
  );
}
