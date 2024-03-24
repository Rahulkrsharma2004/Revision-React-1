import React from 'react'
import "./TodoItem.css"

const TodoItem = ({id,ind,name,title,status,completionDateTime,handleUpdate,handleDelete}) => {
  return (
    <div>
        <h3> 
            {id}
            <span style={{color:"greay"}}> {name}   </span> 
            <span style={{color:"blue"}}>{title}   </span>
            <button className={status=="Completed"?"Completed":"Pending"} onClick={()=>handleUpdate(id,status)} style={{color: status=="Completed" ? "green" : "red" }} disabled={status=="Completed"}>{status=="Completed" ? "Completed":"Pending"}</button>  
            <span>  {completionDateTime}   </span>
            <button onClick={()=>handleDelete(id)}  style={{backgroundColor:"orange",color:"black",cursor:'pointer'}}>DELETE</button>
        </h3> 
    </div>
  )
}

export default TodoItem