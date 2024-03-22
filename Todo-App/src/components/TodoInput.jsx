import React, { useState } from 'react'

const TodoInput = ({handleAdd}) => {
    const [title,setTitle] = useState("")
    const [name,setName] = useState("")

    const handleChange = (e) => {
        setTitle( e.target.value)
    }
    const handleNameChange = (e) => {
        setName( e.target.value)
    }

  return (
    <div>
        <h2>TodoInput</h2>
        <label>
            Title:
            <input 
            id="InputItem" 
            type="text" 
            onChange={handleChange} 
            value={title} 
            placeholder='Title'
            />
        </label>
        <label>
          Assigned To:
          <select onChange={handleNameChange} >
            <option value="">Select...</option>
            <option value="Rahul">Rahul</option>
            <option value="Murtaza">Murtaza</option>
            <option value="Prince">Prince</option>
            <option value="Shubham">Shubham</option>
          </select>
        </label>
        <br />
        <button onClick={()=>handleAdd(title,name)}>ADD TODO</button>
    </div>
  )
}

export default TodoInput