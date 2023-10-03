"use client"
import React, { useState } from 'react'
import EditTaskModal from './EditTaskModal'
import TodoCardMenu from './TodoCardMenu'

type Props = {
    todo: {
        id: number | string
        title: string
        description: string
        done: boolean
        tags: []
    }
    setTodos: React.Dispatch<React.SetStateAction<never[]>>
    todos: []
    homepage: boolean | null
}

const TodoCard = ({todo, setTodos, todos, homepage}: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [task, setTask] = useState(todo)
  const [openActionMenu, setOpenActionMenu] = useState(false)

  const handleActionMenuFn = () => {
    setOpenActionMenu(prevState => !prevState)
  }

  const openEditTask = () => {
    setIsEditModalOpen(true);
    setOpenActionMenu(false)
  };

  const closeEditTask = () => {
    setIsEditModalOpen(false);
  };

  const handleCheckboxChange = () => {
    const updatedTodos = todos.map((task) =>
      task.id === todo.id ? { ...task, done: !task.done } : task
    );
  
    setTodos(updatedTodos)
    localStorage.setItem("TodosPwa", JSON.stringify(updatedTodos));
  };


  /************************************************************************************* */

  
    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setTask({...task, 
            [name]: value})
    }
    const handleEditCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setIsEditModalOpen(false)
        const updatedTodosModal = todos.map((pt) =>
          pt.id === task.id ? {...pt, title: task.title, description: task.description, tags: task.tags} : pt
        )
        setTodos(updatedTodosModal)
        localStorage.setItem("TodosPwa", JSON.stringify(updatedTodosModal));
    }

    const deleteTodos = () => {
      setOpenActionMenu(false)
      const updatedTodos = todos.filter(tf => tf.id !== todo.id)
      setTodos(updatedTodos)
      localStorage.setItem("TodosPwa", JSON.stringify(updatedTodos));
    }

  

  return (
    <div>
      <div className='relative w-full min-h-[250px] bg-customYellow mb-4 p-4 rounded-md flex flex-col justify-between'>
          <div className='flex w-full justify-between items-center'>
            <h3 className={`font-bold m-0 mb-2 text-lg ${todo?.done ? "line-through" : ""}`}>
              {todo.title}
            </h3>
            {!homepage && 
              <>
                <button className='font-bold h-fit w-fit text-xl self-start' onClick={handleActionMenuFn}>...</button>
                {openActionMenu && <TodoCardMenu edit={openEditTask} deletefn={deleteTodos} />}
              </>
            }
          </div>
          <p className={`mb-2 break-words ${todo?.done ? "line-through" : ""}`}>
              {todo.description}
          </p>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
              {todo?.tags.map((t, index) => {
                return (
                  <div key={t + index} className={`w-[40px] h-[40px] rounded-full ${t}`}></div>
                )
              })}
            </div>
            <div className='text-customGray text-lg flex gap-2'>
              <span>done</span>
              <input type="checkbox" name="completed" id="completed" checked={todo.done} onChange={handleCheckboxChange} />
            </div>
          </div>
      </div>

      {isEditModalOpen && <EditTaskModal inputsHandler={inputsHandler} handleCheckboxChange={handleEditCheckboxChange} saveTodo={saveTodo}  close={closeEditTask} task={task} />}
    </div>
  )
}

export default TodoCard