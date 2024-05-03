"use client";
import { schema } from "@/app/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Admin, Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";


const RoleEnum = z.enum(["HEAD", "COORDINATOR", "ASSISTANT"]);

const AdminSchema= z
.object({
  firstName: z
    .string()
    .min(3, { message: "First Name must be atleast 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last Name must be atleast 3 characters" }),
    insId: z.string().min(1, { message: "INS ID is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
    role: RoleEnum
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password don't match"
});


type AdminFormData = z.infer<typeof AdminSchema>;

const AdminForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AdminFormData>({
    resolver: zodResolver(AdminSchema)
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: AdminFormData) => {
    console.log(data)
    try {
      setSubmitting(true);
      const response = await axios.post("/api/account", data);
      toast.success("Account created successfully")
      reset()
      
    } catch (error) {
      setSubmitting(false);
      toast.error("An unexpected Error Occured");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="w-full max-w-lg mt-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
          {...register('firstName')}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Asif"
          />
          {errors.firstName && <p className="text-xs font-semibold text-red-600">{errors.firstName.message}</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
          {...register('lastName')}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Khan"
          />
          {errors.lastName && <p className="text-xs font-semibold text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-id"
          >
            INS-ID
          </label>
          <input
          {...register("insId")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-id"
            type="text"
            placeholder="INS-123"
          />
          {errors.insId && <p className="text-xs font-semibold text-red-600">{errors.insId.message}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
          {...register("password", { required: true })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="password"
            placeholder="******************"
          />
          {errors.password && <p className="text-xs font-semibold text-red-600">{errors.password.message}</p>}
          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you would like
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-cpassword"
          >
            Confirm Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-cpassword"
            type="password"
            placeholder="******************"
            {...register("confirmPassword", {
              required: true
            })}
          />
          {errors.confirmPassword && <p className="text-xs font-semibold text-red-600">{errors.confirmPassword.message}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Position
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              {...register("role")}
            >
              
              <option value="HEAD">Head</option>
              <option value="COORDINATOR">Coordinator</option>
              <option value="ASSISTANT">Assistant</option>
            </select>
            {errors.role && <p className="text-xs font-semibold text-red-600">{errors.role.message}</p>}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-4 p-5" disabled={isSubmitting}> {isSubmitting ? <> Submitting <Spinner /> </> : "Submit"} </Button>
    </form>
  );
};

export default AdminForm;
