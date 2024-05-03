import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
 const [showModal,setShowModal] = useState(false)
 const [text,setText] = useState("")
 const [textList,setTextList] = useState([])
 const [selectedTextList,setSelectedTextList] = useState([])


  const handleSubmit = (event) => {
    event.preventDefault()
    if (text.trim() !== "") {
      setTextList([...textList, { text, id: uuidv4() }])
      setText("")
    }
  }

  const openModal = (id) => {
    const selectedFind = textList.find((text) =>{
      return text.id === id
    })
    setSelectedTextList(selectedFind)
    setShowModal(true)
  } 
  const closeModal = () => {
    if(showModal){
    setShowModal(false)
  }
 }
  return(
    <div className="container" onClick={closeModal}>
     <form className="form" onSubmit={handleSubmit}>
       <input
        type="text"
        disabled={showModal}
         value={text}
          onChange={(event) =>setText(event.target.value) } />
     </form>
     <ul className="liste">
        {textList.map((text) => (
          <li key={text.id} onClick={() => openModal(text.id)}>
            {text.text.length <= 5 ? text.text : `${text.text.substring(0, 5)}...`}
          </li>
        ))}
      </ul>

      {showModal && <Modal selectedTextList={selectedTextList} closeModal={closeModal} />}
    </div>
  )
}

function Modal({ selectedTextList,closeModal }) {
  return (
    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
      <div className="modal-container3" >
      <span className="close" onClick={closeModal} />
        <section>Full Text: {selectedTextList.text}</section>
      </div>
    </div>
  )
}
export default App;
