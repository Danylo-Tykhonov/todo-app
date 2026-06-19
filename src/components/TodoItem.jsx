import { useState } from "react"

export default function TodoItem({todo, edit, deleteTodo, toggleTodo, startEdit, updateTodo, cancelEdit}) {
    
    const [editValue, setEditValue] = useState(todo.text)
    const isEditing = edit === todo.id
    
    return (
        <div className="todo-item">

            <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
                {isEditing ? (
                    <input 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    />
                ) : (
                    todo.text
                )}
            </div>

            <div className="todo-buttons">
                <button onClick={() => deleteTodo(todo.id)}>
                    X
                </button>

                <button onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? "Undo" : "Done"}
                </button>

                <button onClick={() => {
                    if(isEditing) {
                        updateTodo(todo.id, editValue)
                    }

                    else {
                        startEdit(todo.id)}
                    }
                }>     
                {isEditing ? "Save" : "Edit"}
                </button>
                
                {isEditing && (
                <button onClick={cancelEdit}>
                    Cancel
                    </button>
                )}
            </div>
        </div>
    )
}