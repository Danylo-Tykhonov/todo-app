import { useState } from "react"
import { motion } from "framer-motion"

export default function TodoItem({todo, edit, deleteTodo, toggleTodo, startEdit, updateTodo, cancelEdit}) {
    
    const [editValue, setEditValue] = useState(todo.text)
    const isEditing = edit === todo.id
    const formatDate = (date) => {
        return new Date(date).toLocaleString()
    }
    
    return (
        <motion.div 
        className="todo-item"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, x: -50 }}
        >

            <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
                {isEditing ? (
                    <input 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            updateTodo(todo.id, editValue);
                        }
                        
                        if(e.key === "Escape") {
                            cancelEdit();
                        }
                    }}
                    />
                ) : (
                    todo.text
                )}

            <div className="todo-date">
                Created: {formatDate(todo.createdAt)}
            </div>

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
        </motion.div>
    )
}