import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from'@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import './App.css';


function App() {

  const [toDo, setToDo] = useState(
    []
  )

  
  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add Task
  const addTask = () => {
      if(newTask){
        let num = toDo.length + 1
        let newEntry = { id: num, title: newTask, status: false}
        setToDo([...toDo, newEntry])
        setNewTask('');
      }
  }

  // Delete Task
  const deleteTask = (id) => {
      let newTask = toDo.filter(task => task.id !== id)
      setToDo(newTask)
  }

  // Mark Task as done
  const markDone = (id) =>{
      let newTask = toDo.map( task => {
        if (task.id === id){
          return ({...task, status: !task.status })
        }
        return task
      })
      setToDo(newTask)
  }

  // Cancel Update
  const cancelUpdate = (id) =>{
    setUpdateData('')
  }

  // Change task for update
  const changeTask = (e) =>{
      let newEntry = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status ? true : false
      }
      setUpdateData(newEntry)
  }

  //Update task
  const updateTask = () => {
    let filterRecord = [...toDo].filter( task => task.id !== updateData.id)
    let updatedObject = [...filterRecord, updateData]
    setToDo(updatedObject)
    setUpdateData('')
  }

  return (
    <div className="container">
    <br/><br/>
    <h1><b>To Do List App with ReactJS</b></h1>
    <br/><br/>

  {/* Update Task*/}
  { updateData && updateData ? (
  <>
    <div className='row'>
      <div className='col'>
      <input className='form-control form-control-lg' value={updateData.title} 
      onChange={(e) => changeTask(e)}
      />
      </div>
      <div className='col-auto'>
        <button className='btn btn-lg btn-success mr-20' onClick={updateTask}>
          Update
        </button>
        <button className='btn btn-lg btn-warning' onClick={cancelUpdate}>
          Cancel
        </button>
      </div>
    </div>
    <br/>
    </>)
    :(
      <>
  {/* Add Task*/}
    <div className='row'>
      <div className='col'>
        <input className='form-control form-control-lg'
        value={newTask}
        onChange={(e) => 
        setNewTask(e.target.value)}
        />
      </div>
      <div className='col-auto'>
    <button className='btn btn-lg btn-success'
    onClick={addTask}
    >
      Add Task</button>
      </div>
    </div>
    <br/>
    </>
    )}

    {toDo && toDo.length ? '' : 'No tasks'}

    {toDo && toDo
    .sort((a, b) => a.id > b.id ? 1 : -1)
    .map(
      (task, index) => {
        return(
          <React.Fragment key={task.id}>

            <div className='col taskBg'>
              <div className={task.status ? 'done' : ''}>
            
            <span className='taskNumber'>{index + 1}</span>
            <span className='taskText'>{task.title}</span>
            </div>
            <div className='icons'>
                <span title='Status'
                onClick={() => markDone(task.id)}
                >
                  <FontAwesomeIcon icon={faCircleCheck}/> </span>
                
                {task.status ? null :
                <span title='Edit'
                onClick={() => setUpdateData({
                  id: task.id,
                  title: task.title,
                  status: task.status ? true : false
                })}
                >
                <FontAwesomeIcon icon={faPen}/> </span>
                }
                <span title='Delete'
                onClick={() => deleteTask(task.id)}
                >
                <FontAwesomeIcon icon={faTrashCan}/> </span>
            </div>
            </div>
          </React.Fragment>
        )
      }
    )}
    </div>
  );
}

export default App;
