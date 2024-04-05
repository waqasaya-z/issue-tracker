"use client"
import { Button } from '@radix-ui/themes'
import React from 'react'
import toast from 'react-hot-toast'

const AdminFeedback = () => {
  return (
    <div>
        <div className='flex flex-col gap-2'>
              <textarea
              className='border border-gray-500 w-2/3 p-1'
                id="largeTextArea"
                rows={5} 
                cols={40} 
                style={{ resize: 'both' }} 
            /> 
            <Button className='w-36 cursor-pointer' onClick={() => toast.success('Response was sent')}> Send </Button>
        </div>
    </div>
  )
}

export default AdminFeedback