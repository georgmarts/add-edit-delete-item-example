const { useState, useEffect, useContext, useRef } = React;

function App() {

  const [data, setData] = useState([{id: Date.now(), text: 'Test 1'}])

  // INPUT VALUES

  const [inputValue, setInputValue] = useState('')
  const [editInputValue, setEditInputValue] = useState('')
  const [currentItem, setCurrentItem] = useState({})

  // ADD ITEM LOGIC

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setData([...data, {id: Date.now(), text: inputValue}])
    setInputValue('')
  }

  // EDIT LOGIC

  // Get the object and make it the current object

  function handleEdit(arg) {
    setCurrentItem(arg)
  }

  // Add input value to the current object

  function handleEditInput(e) {
    setEditInputValue(e.target.value)
    setCurrentItem({...currentItem, text: e.target.value})
  }

  console.log(editInputValue)
  console.log(currentItem)

  // Create copy of updated data and replace existing data with it

  function handleEditSubmit() {
    const updatedData = data.map((x) => {
      return x.id === currentItem.id ? currentItem : x;
    })
    setData(updatedData)
    setEditInputValue('')
  }

  // DELETE LOGIC (works if edit button is clicked only)

  function handleDeleteBtn() {
    const filteredData = data.filter((x)=>x.id !== currentItem.id)
    setData(filteredData)
  }

  return <main style={{display: 'grid', width: '400px'}}>

    <input onChange={handleInput} type='text' value={inputValue}/>
    <input onClick={handleSubmit} type='submit' value='Add'/>

    {data.map((x)=>{return <div>
      <h5 style={{display: 'inline', marginRight: '10px'}}>{x.text}</h5>
      <button onClick={() => handleEdit(x)}>Edit</button>
      <input type='text' onChange={handleEditInput} value={editInputValue} style={{width: '110px'}}></input>
      <button onClick={handleEditSubmit}>Submit Edit</button>
      <button onClick={handleDeleteBtn}>Delete</button>
      </div>
      })}
  </main>

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
