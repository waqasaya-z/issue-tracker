import React from 'react'
import CourseForm from './CourseForm'
import Redirect from '../student/Redirect'

const AdditionalCourse = () => {
  return (
    <div>
      <Redirect />
        <h1 className='font-semibold text-2xl'> Additional Course </h1>
        <CourseForm />
    </div>
  )
}

export default AdditionalCourse