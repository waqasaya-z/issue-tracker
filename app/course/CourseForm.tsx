"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import semesters from "./course.json";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

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

  semesterName: z.string().min(1, "This field is required."),

  courseName: z.string().min(1, "Coursename field is required."),

  prerequisite: z.string({ invalid_type_error: "You must select one option." }),

  sectionName: z
    .string()
    .min(1, "This field is required.")
    .min(3, { message: "Should contain atleast 3 characters." }),
});

type EnrollmentValidation = z.infer<typeof extraCourseSchema>;

interface Course {
  Code: string;
  "Course Name": string;
  Category: string;
  "Credit Hours": number | string;
  Prerequisite: string;
}

const CourseForm = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const [prerequisite, setPrerequisite] = useState({
    cleared: "", // Default value
  });

  const router = useRouter()

  // Function to handle radio button change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrerequisite({ ...prerequisite, cleared: e.target.value });
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
    setSelectedCourse("");
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EnrollmentValidation>({
    resolver: zodResolver(extraCourseSchema),
  });

  const onSubmit = async (data: EnrollmentValidation) => {
    console.log(data);
    try {
      setLoading(true); // Set loading state to true when submitting
      const response = await axios.post("http://localhost:3000/api/course", data);
      console.log(response.data);
      toast.success("Course was submitted");
      reset(); // Reset the form fields after successful submission
  } catch (error) {
      console.error("Error submitting course:", error);
      toast.error("Failed to submit course");
  } finally {
      setLoading(false); // Set loading state to false when submission completes (whether success or failure)
  }
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

          {/* Select Semester and Course Dropdown Starts Here */}
          <div className="flex gap-2 tracking-wide text-gray-700 text-xs font-bold mb-2">
            <select
              {...register("semesterName")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedSemester}
              onChange={handleSemesterChange}
            >
              <option
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value=""
              >
                Select Semester
              </option>
              {Object.keys(semesters).map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
            {selectedSemester && (
              <>
                <select
                  {...register("courseName")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                >
                  <option
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    value=""
                  >
                    Select Course
                  </option>
                  {semesters[
                    selectedSemester as keyof typeof semesters
                  ].Courses.map((course: Course) => (
                    <option key={course.Code} value={course["Course Name"]}>
                       {course["Course Name"]}
                    </option>
                  ))}
                </select>
               
              </>
            )}
            {errors.semesterName && (
              <p className="text-xs font-semibold text-red-600">
                {errors.semesterName.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Have you cleared the pre-requisite of the selected course?
          </p>
          <label htmlFor="yes" className="inline-flex items-center mr-4">
            <input
              {...register("prerequisite")}
              type="radio"
              id="yes"
              value="yes"
              className="form-radio h-5 w-5 text-indigo-600"
              checked={prerequisite.cleared === "yes"}
              onChange={handleRadioChange}
            />
            <span className="block uppercase tracking-wide text-gray-700 text-xs font-semibold ml-2">Yes</span>
          </label>
          <label htmlFor="no" className="inline-flex items-center">
            <input
              {...register("prerequisite")}
              type="radio"
              id="no"
              value="no"
              className="form-radio h-5 w-5 text-indigo-600"
              checked={prerequisite.cleared === "no"}
              onChange={handleRadioChange}
            />
            <span className="block uppercase tracking-wide text-gray-700 text-xs font-semibold ml-2">No</span>
          </label>
          {errors.prerequisite && (
            <p className="text-xs font-semibold text-red-600">
              {errors.prerequisite.message}
            </p>
          )}
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
            placeholder="Section:B"
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
      <Button className="mt-1 p-5" disabled={loading}> {loading ? <> Submitting <Spinner /> </> : "Submit"} </Button>
    </form>
  );
};

export default CourseForm;
