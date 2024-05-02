"use client";
import { Button } from "@radix-ui/themes";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";

const AdminFeedback = ({ id }: { id: String }) => {
  const validationSchema = z.object({
    feedback: z.string().min(1, { message: "ID is required" })
  });

  type FeedbackValidation = z.infer<typeof validationSchema>;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FeedbackValidation>({
    resolver: zodResolver(validationSchema)
  });

  const validateUser = async (data: FeedbackValidation) => {
    const response = await axios.patch("/api/issues/" + id, data);
    console.log(response.data);
    setTimeout(() => {
      router.refresh()
     }, 3000)
    // const accessToken = response.data.accessToken;
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("userData", JSON.stringify(response.data));
    return response;
  };

  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    FeedbackValidation
  >({
    mutationFn: validateUser
  });

  const onSubmit: SubmitHandler<FeedbackValidation> = useCallback(
    (data: FeedbackValidation) => {
      console.log(data);
      mutation.mutate(data, {
        onSuccess: (data, variables, context) => {
          toast.success("Response was sent");
        },
        onError: () => {
          toast.error("Feednack could not be sent");
        }
      });
    },
    [mutation]
  );

  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="border border-gray-500 w-2/3 p-1"
          id="largeTextArea"
          rows={5}
          cols={40}
          style={{ resize: "both" }}
          {...register("feedback", { required: true })}
        />
        <Button disabled={mutation.isPending} className="w-36 cursor-pointer">
          {mutation.isPending ? (
            <span className="loading loading-infinity loading-md">
              <Spinner />
            </span>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AdminFeedback;
