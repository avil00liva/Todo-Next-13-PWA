"use client";

import NewTaskModal from '@/components/NewTaskModal';
import TodoCard from '@/components/TodoCard'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Props = {}

const Todos = (props: Props) => {
  const [todos, setTodos] = useState([])

  const [addTask, setAddTask] = useState(false)
  const [task, setTask] = useState({id: new Date().getTime(), title: "", description: "", tags: [], done: false})

  useEffect(() => {
    const storedTodos = localStorage.getItem("TodosPwa");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    }
  }, []);
  

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

  return (
    <main className='p-4 relative '>
      <header>
        <nav className='flex justify-between items-center'>
          <span className='text-2xl font-bold'>
            <Link href={"/"}>Todos</Link>
          </span>
          <span className='text-4xl font-bold cursor-pointer' onClick={openAddTask}>+</span>
        </nav>
        <div className='mt-4 mb-8 flex items-center gap-4 overflow-x-scroll min-h-[80px]'>
          <div className='flex items-center gap-2'>
            <div className='w-[40px] h-[40px] rounded-full bg-customRed'></div>
            Entertainment
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-[40px] h-[40px] rounded-full bg-customGreen'></div>
            Family
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-[40px] h-[40px] rounded-full bg-customPurple'></div>
            Work
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-[40px] h-[40px] rounded-full bg-customBlue'></div>
            Study
          </div>
        </div>
      </header>
      {todos.length === 0 && <div>You have 0 tasks</div>}
      {todos.length !== 0 && todos.map((td) => {
        return (
          <TodoCard todo={td} key={td.id} todos={todos} setTodos={setTodos} />
        )
      })}
      {addTask && <NewTaskModal 
            close={closeAddTask} 
            handleCheckboxChange={handleCheckboxChange} 
            inputsHandler={inputsHandler} 
            task={task} 
            saveTodo={saveTodo}
        />
        }
    </main>
  )
}

export default Todos