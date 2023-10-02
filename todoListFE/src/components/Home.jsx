import React, {useState} from 'react'
import Create from './Create';
import '../css/Home.css';
import axios from 'axios';
import { useEffect } from 'react';
function Home(){

  const handleEdit=(id)=>{
    axios.put('http://127.0.0.1:3000/update/'+id).
    then(result=> { location.reload(); })
    .catch(err=>console.log(err))
  }

  const handleDelete=(id)=>{
    axios.delete('http://127.0.0.1:3000/delete/'+id).
    then(result=> { location.reload(); })
    .catch(err=>console.log(err))
  }


    const [todos,setTodos] = useState([]);
    useEffect(() => {
      axios.get('http://127.0.0.1:3000/get').
      then(result =>{
        console.log(result.data);
        setTodos(result.data)  }).
      catch(err => console.log(err))
    },[])
    return (
        <div className="container-home">
          <h2>To do List</h2>
          <Create/>
        {
            todos.length===0
            ?
             <h2>No records</h2>
             :
             todos.map(ele=>(

              <div className="todolist" key={ele._id}>
                <div className={ele.done? "line-through":""}>
                 {ele.task}
                 </div>
                 <div>
                 <button className="btn btn-done" onClick={()=>handleEdit(ele._id)}>Done</button> 
                 </div>
                 <div>
                 <button className="btn btn-delete" onClick={()=>handleDelete(ele._id)}>Delete</button>
                 </div>
              </div>
             ))
             
             
        }
          
        </div>
      )
}


export default Home;