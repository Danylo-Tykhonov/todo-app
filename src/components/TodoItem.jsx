import { useState } from "react"
import { motion } from "framer-motion"

export default function TodoItem({todo, edit, draggedId, handleDragStart, handleDragEnd, handleDrop, deleteTodo, toggleTodo, startEdit, updateTodo, cancelEdit}) {
    
    const [editValue, setEditValue] = useState(todo.text)
    const [isOver, setIsOver] = useState(false)
    const [isPointerDown, setIsPointerDown] = useState(false)
    const isEditing = edit === todo.id
    const isDragging = draggedId === todo.id || isPointerDown
    const formatDate = (date) => {
        return new Date(date).toLocaleString()
    }
    
    return (
        <motion.div 
        className={`todo-item ${isDragging ? "dragging" : ""} ${isOver ? "drag-over" : ""}`}
        draggable
        onPointerDown={() => setIsPointerDown(true)}
        onPointerUp={() => setIsPointerDown(false)}
        onPointerCancel={() => setIsPointerDown(false)}
        onDragStart={(e) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(todo.id));
            handleDragStart(todo.id);
        }}
        onDragEnter={() => setIsOver(true)}
        onDragLeave={() => setIsOver(false)}
        onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        }}
        onDrop={(e) => {
            e.preventDefault();
            setIsOver(false);
            setIsPointerDown(false);
            handleDrop(todo.id);
        }}
        onDragEnd={(e) => {
            setIsOver(false);
            setIsPointerDown(false);
            handleDragEnd(todo.id);
        }}
        whileDrag={{
            scale: 1.05,
            opacity: 0.7
        }}
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