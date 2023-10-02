import React, {useState} from 'react'
import axios from 'axios';
import '../css/Create.css';
function Create() {
    const [list,setList]=useState();
    const handleAdd=()=>{
      axios.post('http://127.0.0.1:3000/add',{task:list})
      .then(result=>{
        location.reload();
        console.log(result)})
      .catch(err=>console.log(err))
    }



  return (
    <div className="add-content">
        
        <input type="text" placeholder='Enter your list'  id='addItem' onChange={(e)=>setList(e.target.value)}/>
        <button type="submit" className="btn btn-add" onClick={handleAdd}>Add</button>
        
    </div>
  )
}

export default Create;