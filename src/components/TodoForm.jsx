export default function TodoForm({input, handleInputChange, addTodo, edit, saveEdit, cancelEdit}) {
    return(
        <div className="header">
              <div className="input">
            <input 
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {if(e.key === "Enter"){
                if(edit === null){
                    addTodo();
                }
                else{
                    saveEdit();
                }
            }}}
            />
        </div>
            <button onClick={() => {
                if(edit === null){
                    addTodo();
                }
                else{
                    saveEdit();
                }
            }} disabled = {input.trim() === ""}>{edit === null ? "Add" : "Save"}</button>

            {edit !== null && (
                <button onClick={cancelEdit}>
                    Cancel
                </button>
            )}
        </div>
    )
}