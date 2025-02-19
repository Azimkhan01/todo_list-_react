import React, { useContext, useState, useRef } from 'react'
import { todo } from '../context/todo'
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

function ShowTask() {
  const todoState = useContext(todo)
  
  // State to hold edited values for each task
  const [editedTasks, setEditedTasks] = useState({})

  const taskRefs = useRef([])

  function handleOnChange(e, index) {
    setEditedTasks(prev => ({
      ...prev,
      [index]: e.target.value // Update the specific task based on index
    }))
  }

  function handleBlur(e, index) {
    const updatedTodos = [...todoState.todos]
    updatedTodos[index]["task"] = editedTasks[index] || todoState.todos[index].task // Use editedTask or fallback to original
    todoState.setTodos(updatedTodos)  // Update todo list with new task
    // console.log("Task edited at index:", index)

    // Reset the edited task for the current task only
    setEditedTasks(prev => {
      const newEditedTasks = { ...prev }
      delete newEditedTasks[index]  // Remove the edited task for the current index
      return newEditedTasks
    })
}


  function handleEditClick(index) {
    setEditedTasks(prev => ({
      ...prev,
      [index]: todoState.todos[index].task // Initialize the task edit state with the current task
    }))
    setTimeout(() => {
     
      taskRefs.current[index].focus();
        taskRefs.current[index].select();
       
    }, 50);  // Small delay to ensure input field is focused after the update
  
  }

  function handleDelete(e, index) {
    // Create a new array without the task at the given index
    const updatedTodos = todoState.todos.filter((_, i) => i !== index)
  
    // Update the state with the new todo list
    todoState.setTodos(updatedTodos)
  
    console.log("Task deleted at index:", index)
  }
  
  function handleComplete(index,e)
  {
    const updatedTodos = [...todoState.todos]
    updatedTodos[index]["isCompleted"] = e.target.checked
    todoState.setTodos(updatedTodos)
    console.log(todoState.todos)
  }

  return (
    <div className='flex flex-col gap-3 border-t-1  p-3 rounded w-full'>
      <div
      className='flex justify-end'
      >
        <p
        className='p-2 border-2 rounded font-semibold text-blue-500'
        >Task : {todoState.todos.length}</p>
      </div>
      {todoState.todos.map((e, index) => (
        <div key={index} className='border-0 shadow rounded p-2'>
          <div className='flex flex-row justify-between'>
            <input
              ref={(el) => taskRefs.current[index] = el}  // Set ref for each task dynamically
              readOnly={!editedTasks[index]}
              className={`${!editedTasks[index] ? "text-gray-900" : "text-gray-400"} ease-in-out duration-150 focus:outline-none focus:ring-0 focus:border-0 ${e.isCompleted ? "line-through" : "" }`}
              type='text'
              value={editedTasks[index] || e.task} // Display editedTask or fallback to original task
              placeholder={e.task}
              onChange={(e) => handleOnChange(e, index)}  // Update edited task value on change
              onBlur={(e) => handleBlur(e, index)}  // Save task on blur
            />
            <div className='p-2 flex flex-row gap-2 text-medium'>
            <button
              className={`${e.isCompleted ? "text-gray-400 ease-in-out duration-150" : "text-gray-900 ease-in-out duration-150"} shadow-xl`} 
              disabled = {e.isCompleted}
              onClick={() => handleEditClick(index)}  // Toggle edit mode for specific task
            >
              <FaRegPenToSquare />
            </button>
            <button 
            className={` shadow-xl`} 
            // disabled = {e.isCompleted}
            onClick={(e)=>{handleDelete(e,index)}}
            >
            <MdDeleteOutline />
            </button>
            <input
              onClick={(e) => {handleComplete(index,e)}}
            type='checkbox'
            />
            </div>
          </div>
          <p className={`p-1 text-xs text-zinc-600 ${e.isCompleted ? "line-through ease-in-out duration-150" : "ease-in-out duration-150" } `}>
            {e.date.toString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ShowTask
