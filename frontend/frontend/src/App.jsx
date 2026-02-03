import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([
    {
      title: "test 1 ",
      description: "description"
    },
  ])

  function fetchNotes() {
    axios.get('https://note-application-lz2o.onrender.com/note')
      .then((res) => {
        setNotes(res.data)
      })
  }
  useEffect(() => {
    fetchNotes()
  }, [])

  function handLesubmit(e){
    e.preventDefault();
    const{title, description} = e.target.elements
    console.log(title.value, description.value)

    axios.post('https://note-application-lz2o.onrender.com/note', {
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data)
      fetchNotes()  
    })
  }

  function handleDeleteNote(noteId){
    console.log("delete", noteId)
    axios.delete(`https://note-application-lz2o.onrender.com/note/${noteId}`)
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
  }
  
  function handleUpdateNote(noteId){

    console.log("update", noteId)
    axios.patch(`https://note-application-lz2o.onrender.com/note/${noteId}`)
    const newDescription = prompt("Enter new description:")
    if(newDescription){
      axios.patch(`https://note-application-lz2o.onrender.com/note/${noteId}`, {
        description: newDescription
      })
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
    }

  }


  return (
    <>
    <form className="note-create-form" onSubmit={handLesubmit}>
      <input name="title" type="text"  placeholder="Title" />
      <input name="description" type="text" placeholder="Description" />
      <button type="submit">Add Note</button>
    </form>


      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button className="delete" onClick={()=>{handleDeleteNote(note._id)}}>DELETE</button>
              <button onClick={()=>{handleUpdateNote(note._id)}}>UPDATE</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App