const { useState, useEffect, useContext, useRef } = React;

function App() {

  const [data, setData] = useState([{id: Date.now(), text: 'Test 1', color: 'none'}])

  // INPUT VALUES

  const [inputValue, setInputValue] = useState('')
  const [editInputValue, setEditInputValue] = useState('')
  const [isLoading, setisLoading] = useState(false)
  function handleEditBtn() {
    setisLoading(x => !x)
  }

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

  function handleEditInput(e) {
    setEditInputValue(e.target.value)
  }

  // Create copy of updated data and replace existing data with it

  function handleEditSubmit(arg) {
    const updatedData = data.map((x) => {
      return x.id === arg.id ? {...x, text: editInputValue} : {...x};
    })
    setData(updatedData)
    setEditInputValue('')
  }

  // DELETE LOGIC

  function handleDeleteBtn(arg) {
    const filteredData = data.filter((x)=>x.id !== arg.id)
    setData(filteredData)
  }
  
  // CHANGE STYLE OF SELECTED ITEM
  function handleStyleBtn(arg) {
    const stylizedData = data.map((x)=> {
      return x.id === arg.id ? x.color === 'red' ? {...x, color: 'none'} : {...x, color: 'red'} : {...x, color: 'none'}
    })
    setData(stylizedData)
  }
  
  return <main style={{display: 'grid', width: '400px'}}>

    <input onChange={handleInput} type='text' value={inputValue}/>
    <input onClick={handleSubmit} type='submit' value='Add'/>

    {data.map((x)=>{return <div>
      <h5 style={x.color === 'red' ? {backgroundColor: 'red'} : {}}>{x.text}</h5>
      <button onClick={handleEditBtn}>Edit</button>

      
    {isLoading ? <>
      <input type='text' onChange={handleEditInput} value={editInputValue} style={{width: '110px'}}></input>
      <button onClick={() => handleEditSubmit(x)}>Submit Edit</button>
      <button onClick={() => handleDeleteBtn(x)}>Delete</button>
      <button onClick={() => handleStyleBtn(x)}>Stylize</button> </> : null}

      </div>
      })}
  </main>

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
