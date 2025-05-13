import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const API = "http://localhost:5000/api/notes"


const App = () => {

  const [notes, setNotes] = useState([])
  const [form, setForm] = useState({title : '', content : ''})
  const [editId, setEditId] = useState(null)

  const getNotes = async() =>{
    const res = await axios.get(API)
    setNotes(res.data)
  }

  useEffect(() =>{
    getNotes()
  },[])


  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(editId){
      await axios.put(`${API}/${editId}`,form)
      setEditId(null)
    }
    else{
      await axios.post(API,form)
    }
    setForm({title: '', content : ''})
    getNotes()
  }
  
  const handleEdit = note =>{
    setForm({title : note.title, content : note.content})
    setEditId(note._id)
  }

  const handleDelete = async(id) =>{
    await axios.delete(`${API}/${id}`)
    getNotes()  
  }


  return (
    <div className='container mt-4'>
      <h2>MERN Notes</h2>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input className='form-control mb-2' placeholder='Title' value={form.title} onChange={e => setForm({...form, title : e.target.value})} />
        <textarea className='form-control mb-2' placeholder='Content' value={form.content} onChange={e => setForm({...form, content : e.target.value})}></textarea>
        <button className='btn btn-primary'>{editId ? "Update" : "Add"}</button>
      </form>

      <ul className='list-group'>
        {notes.map(note =>(
          <li key={note._id} className='list-group-item d-flex justify-content-between align-items-center'>
            <div>
              <strong>{note.title}</strong><br/>
              {note.content}
            </div>
            <div>
              <button className='btn btn-sm btn-warning me-2' onClick={() => handleEdit(note)}>Edit</button>
              <button className='btn btn-sm btn-danger' onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          </li>        
        ))}
      </ul>

    </div>
  )
}

export default App