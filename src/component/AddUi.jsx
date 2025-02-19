import React from 'react'
import { useContext , useState , useRef } from 'react'
import {todo} from '../context/todo'
function AddUi() {
  const task = useRef()
  const [isDisabled , setisDisabled] = useState(false)
  const [status,setStatus] = useState("Add Task")
  const todoState = useContext(todo)
  // console.log(todoState)
  function handleClick()
  {
    setStatus("Adding ...")
    setisDisabled(true)
   setTimeout(()=>{
    setStatus("Added")
    setTimeout(()=>{
      setStatus("Add Task")
      setisDisabled(false)
      todoState.setTodos([...todoState.todos,
        {
          task:task.current.value,
          date:new Date()
        }
      ])
      task.current.value = ""
      // console.log(todoState.todos)
     },500)
   },1000)
   
  }
  return (
    <div className='flex gap-3 w-full justify-center items-center p-2'>
      <input 
        ref={task}
        className='border-1 rounded  w-1/2 font-semibold text-gray-700 p-2'
        placeholder='task'
        type='text'
         />
        <input
         className={`border-2 font-semibold px-4 py-2 text-medium rounded 
          ${isDisabled ? "bg-zinc-300" : "bg-white" }
          hover:bg-zinc-300
          hover:text-white
          ease-in-out
          duration-100
          `}
        value={status}
        disabled = {isDisabled}
        onClick={handleClick}
        type='button'
        />
    </div>
  )
}

export default AddUi
