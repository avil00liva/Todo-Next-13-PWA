"use client";
import React, {useState} from 'react'

interface Todo {
    id: string | number
    title: string
    description: string
    tags: string[]
    done: boolean
}

type Props = {
    close: ()=> void
    task: Todo
    inputsHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> void
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
    saveTodo: (task: {}) => void
}

const NewTaskModal = ({close, task, inputsHandler, handleCheckboxChange, saveTodo}: Props) => {

  return (
    <div className='z-50 fixed top-0 left-0 w-full h-screen bg-[#3d3c3999]'>
        <div className='bg-white w-full h-full rounded-t-2xl mt-4 p-4 showModal'>
            <div className='flex justify-between items-center min-h-[50px]'>
                <span className='cursor-pointer hover:opacity-75 duration-500 transition-opacity' onClick={close}>Cancel</span>
                <button onClick={saveTodo} className='text-gray-100 bg-customBlack py-3 px-10 rounded-md max-w-[220px]'>Add</button>
            </div>

            <div>
                <label className='text-xl font-bold' htmlFor="title">Title</label>
                <input type="text" id='title' name='title' value={task.title} onChange={inputsHandler} className='my-4 outline-none border-0 border-transparent w-full py-4 px-2 text-customBlack bg-gray-100 rounded-md' placeholder='Add a title..' />
                
                <label className='text-xl font-bold' htmlFor="description">Description</label>
                <textarea name='description' id='description' value={task.description} onChange={inputsHandler} className='my-4 min-h-[150px] outline-none border-0 border-transparent w-full py-4 px-2 text-customBlack bg-gray-100 rounded-md' placeholder='Add a description..' />
            </div>

            <div>
                <h2 className='text-xl font-bold mb-4'>Tags</h2>
                <ul className='flex flex-col gap-2'>
                    <li className='flex items-center gap-4 font-medium'>
                        <input type="checkbox" name="entertainment" value="bg-customRed" checked={task.tags.includes("bg-customRed")} onChange={handleCheckboxChange} />
                        <div className='w-[40px] h-[40px] rounded-full bg-customRed'></div>
                        Entertainment
                    </li>
                    <li className='flex items-center gap-4 font-medium'>
                        <input type="checkbox" name="family" value="bg-customGreen" checked={task.tags.includes("bg-customGreen")} onChange={handleCheckboxChange} />
                        <div className='w-[40px] h-[40px] rounded-full bg-customGreen'></div>
                        Family
                    </li>
                    <li className='flex items-center gap-4 font-medium'>
                        <input type="checkbox" name="work" value="bg-customPurple" checked={task.tags.includes("bg-customPurple")} onChange={handleCheckboxChange} />
                        <div className='w-[40px] h-[40px] rounded-full bg-customPurple'></div>
                        Work
                    </li>
                    <li className='flex items-center gap-4 font-medium'>
                        <input type="checkbox" name="study" value="bg-customBlue" checked={task.tags.includes("bg-customBlue")} onChange={handleCheckboxChange} />
                        <div className='w-[40px] h-[40px] rounded-full bg-customBlue'></div>
                        Study
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NewTaskModal