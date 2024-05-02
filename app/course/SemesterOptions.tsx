import React, { useState } from "react";
import semesters from "./course.json";

interface Course {
  Code: string;
  "Course Name": string;
  Category: string;
  "Credit Hours": number | string;
  Prerequisite: string;
}

interface Semester {
  "Credit Hours": number;
  Courses: Course[];
}

const CourseSelector = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
    setSelectedCourse("");
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="flex gap-2 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      <select
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
            {semesters[selectedSemester as keyof typeof semesters].Courses.map(
              (course: Course) => (
                <option key={course.Code} value={course.Code}>
                  {course.Code} - {course["Course Name"]}
                </option>
              )
            )}
          </select>
        </>
      )}
    </div>
  );
};

export default CourseSelector;
