export default function TodoForm({input, handleInputChange, addTodo}) {
    return(
        <div className="header">
              <div className="input">
            <input 
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {if(e.key === "Enter"){
                addTodo();
            }}}
            />
        </div>
            <button onClick={addTodo} disabled = {input.trim() === ""}>Add</button>
        </div>
    )
}