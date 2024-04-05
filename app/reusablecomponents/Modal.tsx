"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import toast from "react-hot-toast";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal = ({ visible, onClose }: ModalProps) => {
  const validationSchema = z.object({
    insId: z.string().min(1, { message: "ID is required" }),
    password: z.string().min(1, { message: "Password is required" })
  });

  type LoginValidation = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValidation>({
    resolver: zodResolver(validationSchema)
  });

  const router = useRouter();

  const validateUser = async (data: LoginValidation) => {
    const response = await axios.post("http://localhost:3000/api/admin", data);
    console.log(response.data);
    // const accessToken = response.data.accessToken;
    // localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(response.data));
    return response;
  };

  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    LoginValidation
  >({
    mutationFn: validateUser
  });

  const onSubmit: SubmitHandler<LoginValidation> = useCallback(
    (data: LoginValidation) => {
      console.log(data);
      mutation.mutate(data, {
        onSuccess: (data, variables, context) => {
          router.push("/dashboard");
          toast.success("Welcome Aboard!");
        },
        onError: () => {
          toast.error("Invalid Credentials");
        }
      });
    },
    [mutation, router]
  );

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
      console.log(visible);
    }
  };

  if (visible) {
    return (
      <div
        id="modalBackdrop"
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-slate-800 bg-opacity-20 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="bg-white flex flex-col justify-center px-16 rounded-2xl border border-slate-500 shadow-lg w-full md:w-1/3 h-2/3 sm:h-3/4">
          <h1 className="font-bold text-center text-2xl text-black mb-2 ">
            Welcome back
          </h1>
          <p className="text-center font-semibold text-black mb-5 text-lg ">
            Sign in
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5 gap-1">
              <div className="mb-4">
                <input
                  type="text"
                  className="p-3 rounded font-semibold border border-gray-800 w-full"
                  placeholder="INS-ID"
                  {...register("insId", { required: true })}
                />
                {errors.insId && (
                  <p className="text-xs font-semibold text-center text-red-600 mt-1">
                    {" "}
                    {errors.insId?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  className="p-3 rounded font-semibold border border-gray-800 w-full"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-xs font-semibold text-center text-red-600 mt-1">
                    {" "}
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>
            <div className=" flex justify-center">
              <button
                disabled={mutation.isPending}
                className="px-5 py-2 font-semibold bg-gray-700 text-white rounded"
              >
                {mutation.isPending ? (
                  <span className="loading loading-infinity loading-md">
                    <Spinner />
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
