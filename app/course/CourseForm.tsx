'use client'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import CourseSelector from "./SemesterOptions";

const extraCourseSchema = z.object({
  firstName: z
    .string()
    .min(1, "This field is required.")
    .min(3, { message: "Should contain atleast 3 characters." }),

  lastName: z
    .string()
    .min(1, "This field is required.")
    .min(3, { message: "Should contain atleast 3 characters." }),

  cmsId: z
    .string()
    .min(1, "This field is required.")
    .min(11, { message: "Must be 11 characters long." }),

  courseName: z
    .string()
    .min(1, "This field is required.")
    .min(3, { message: "Should contain atleast 3 characters." }),

  sectionName: z
    .string()
    .min(1, "This field is required.")
    .min(3, { message: "Should contain atleast 3 characters." }),
});

type EnrollmentValidation = z.infer<typeof extraCourseSchema>;

const CourseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnrollmentValidation>({
    resolver: zodResolver(extraCourseSchema),
  });

  const onSubmit = (data: EnrollmentValidation) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mt-2">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            {...register("firstName")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Waqas"
          />
          {errors.firstName && (
            <p className="text-xs font-semibold text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Ayaz"
          />
          {errors.lastName && (
            <p className="text-xs font-semibold text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-cms"
          >
            CMS-ID
          </label>
          <input
            {...register("cmsId")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-cms"
            type="text"
            placeholder="023-2X-XXXX"
          />
          {errors.cmsId && (
            <p className="text-xs font-semibold text-red-600">
              {errors.cmsId.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-coursename"
          >
            Select Course
          </label>
          <CourseSelector />
        </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-coursename"
          >
            Course Name
          </label>
          <input
            {...register("courseName")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-coursename"
            type="text"
            placeholder="Calculus-II"
          />
          {errors.courseName && (
            <p className="text-xs font-semibold text-red-600">
              {errors.courseName.message}
            </p>
          )}

          <p className="text-gray-600 text-xs italic">
            Course name you would like to enroll in
          </p>
        </div>
        </div>
     
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-sectionname"
          >
            Section
          </label>
          <input
            {...register("sectionName")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-sectionname"
            type="text"
            placeholder="BS-II Section:B"
          />
          {errors.sectionName && (
            <p className="text-xs font-semibold text-red-600">
              {errors.sectionName.message}
            </p>
          )}

          <p className="text-gray-600 text-xs italic">
            Section where the course is being offered
          </p>
        </div>
      </div>
      <Button className="mt-1 p-5">
        {" "}
        Submit{" "}
      </Button>
    </form>
  );
};

export default CourseForm;
