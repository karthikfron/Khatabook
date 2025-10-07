import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Customer } from "../pages/Board";
import { useTranslation } from "react-i18next";

type Props = {
  onSubmit: (newCustomer: Customer) => void;
  closeModal?: () => void;
};

type CustomerFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function AddCustomerForm({ onSubmit, closeModal }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormInputs>();

  const handleFormSubmit = (data: CustomerFormInputs) => {
    const today = new Date().toISOString().slice(0, 10);
    const newCustomer: Customer = {
      id: Date.now(),
      name: data.name,
      contact: { email: data.email, phone: data.phone },
      address: data.address,
      joinDate: today,
      totalCredit: 2000,
      balance: 0,
      dueDate: "—",
      status: t("up_to_date"),
      transactions: [],
    };

    onSubmit(newCustomer);
    toast.success(t("customer_added_successfully"));
    closeModal?.();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register("name", { required: t("name_required") })}
        placeholder={t("name")}
        className="w-full border p-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        {...register("email", {
          required: t("email_required"),
          pattern: { value: /^\S+@\S+$/, message: t("invalid_email") },
        })}
        placeholder={t("email")}
        className="w-full border p-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("phone", {
          required: t("phone_required"),
          minLength: { value: 10, message: t("enter_valid_phone") },
        })}
        placeholder={t("phone")}
        className="w-full border p-2 rounded"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <input
        {...register("address", { required: t("address_required") })}
        placeholder={t("address")}
        className="w-full border p-2 rounded"
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        {t("add_customer")}
      </button>
    </form>
  );
}