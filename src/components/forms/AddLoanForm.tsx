import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Transaction } from "../pages/Board";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      status: dueTime < now ? t("overdue") : t("up_to_date"),
    });

    toast.success(t("loan_added_successfully"));
    closeModal?.();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register("item", { required: t("item_required") })}
        placeholder={t("item")}
        className="w-full border p-2 rounded"
      />
      {errors.item && (
        <p className="text-red-500 text-sm">{errors.item.message}</p>
      )}

      <input
        type="number"
        {...register("amount", {
          required: t("amount_required"),
          min: { value: 1, message: t("enter_valid_amount") },
        })}
        placeholder={t("amount")}
        className="w-full border p-2 rounded"
      />
      {errors.amount && (
        <p className="text-red-500 text-sm">{errors.amount.message}</p>
      )}

      <input
        type="date"
        {...register("dueDate", { required: t("due_date_required") })}
        className="w-full border p-2 rounded"
      />
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        {t("add_loan")}
      </button>
    </form>
  );
}
