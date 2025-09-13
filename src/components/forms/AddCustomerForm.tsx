import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Customer } from "../pages/Board";

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
      status: "Up-to-date",
      transactions: [],
    };

    onSubmit(newCustomer);
    toast.success("Customer added successfully");
    closeModal?.();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
        })}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("phone", {
          required: "Phone is required",
          minLength: { value: 10, message: "Enter valid phone" },
        })}
        placeholder="Phone"
        className="w-full border p-2 rounded"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <input
        {...register("address", { required: "Address is required" })}
        placeholder="Address"
        className="w-full border p-2 rounded"
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        Add Customer
      </button>
    </form>
  );
}
