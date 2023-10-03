"use client";

import React, { useState, useEffect} from 'react'
import Link from 'next/link'
import banner from "@/assets/brain-render.png"
import Image from 'next/image'
import NewTaskModal from './NewTaskModal'
import TodoCard from './TodoCard';

const HomePage = () => {
    const [addTask, setAddTask] = useState(false)
    const [task, setTask] = useState({id: new Date().getTime(), title: "", description: "", tags: [], done: false})

    const [todos, setTodos] = useState([])

    useEffect(()=>{
        const getTodos = JSON.parse(localStorage.getItem("TodosPwa"))
        setTodos(getTodos)
    }, [])
    
    console.log("TODOSSS: ", todos)

    const openAddTask = () => {
        setAddTask(prevState => !prevState)
    }

    const closeAddTask = () => {
        setAddTask(false)
    }

    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setTask({...task, 
            [name]: value})
    }
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
    
        const updatedTags = [...task.tags];
    
        if (checked) {
          
          updatedTags.push(value);
        } else {
          
          const index = updatedTags.indexOf(value);
          if (index !== -1) {
            updatedTags.splice(index, 1);
          }
        }
        setTask({
            ...task,
            tags: updatedTags,
          });
    }

    const saveTodo = () => {
        setAddTask(false)
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos, task];
            localStorage.setItem("TodosPwa", JSON.stringify(updatedTodos));
            return updatedTodos;
          });
        setTask({id: new Date().getTime(), title: "", description: "", tags: [], done: false})
    }

    const homepage = true

  return (
    <div className='w-full min-h-screen p-4'>
        <section className='mt-10 flex flex-col items-center'>
            <h1 className='mb-4 text-3xl font-bold text-center'>TODO</h1>
            <p className='mb-6 text-center'>Organize your tasks to make your days calmer.</p>
            <button className='mb-16 text-gray-100 bg-customBlack py-3 px-10 rounded-md max-w-[220px]' onClick={openAddTask}>Get Started</button>

            <div>
                <Image 
                    width={0}
                    height={0}
                    alt='Banner Brain Illustration'
                    src={banner}
                    className='min-w-full h-[250px] object-contain'
                />
                <div>
                    <div className='text-center'>You have {todos?.length} tasks</div>
                </div>
            </div>
        </section>
        {addTask && <NewTaskModal 
            close={closeAddTask} 
            handleCheckboxChange={handleCheckboxChange} 
            inputsHandler={inputsHandler} 
            task={task} 
            saveTodo={saveTodo}
        />
        }
        {todos.length ? <TodoCard homepage={homepage} todo={todos.at(-1)} /> : ""}
        <Link className='underline text-blue-950 cursor-pointer text-lg' href={"/todos"}>View more..</Link>
    </div>
  )
}

export default HomePage