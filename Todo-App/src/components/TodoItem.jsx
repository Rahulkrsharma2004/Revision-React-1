import React from 'react'
import "./TodoItem.css"

const TodoItem = ({id,ind,name,title,status,completionDateTime,handleUpdate,handleDelete}) => {
  return (
    <div>
        <h3> 
            {ind+1}
            <span style={{color:"greay"}}> {name}   </span> 
            <span style={{color:"blue"}}>{title}   </span>
            <button className={status?"Completed":"Pending"} onClick={()=>handleUpdate(id,status)} style={{color: status ? "green" : "red" }} disabled={status}>{status ? "Completed":"Pending"}</button>  
            <span>  {completionDateTime}   </span>
            <button onClick={()=>handleDelete(id)}  style={{backgroundColor:"orange",color:"black",cursor:'pointer'}}>DELETE</button>
        </h3> 
    </div>
  )
}

export default TodoItem