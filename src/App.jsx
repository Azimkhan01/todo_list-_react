import React from 'react'
import { TodoProvider } from './context/todo'
import AddUi from './component/AddUi'
import ShowTask from './component/ShowTask'

function App() {
  
  return (
    <div className='w-full flex flex-col gap-2 p-3 justify-center items-center'>
        <TodoProvider>
            <div>
              <h1 className='font-bold text-3xl border-0 border-slate-700 rounded p-2 text-gray-700'>Todo List</h1>
            </div>
            <AddUi/>
            <ShowTask/>
        </TodoProvider>
    </div>

  )
}

export default App
