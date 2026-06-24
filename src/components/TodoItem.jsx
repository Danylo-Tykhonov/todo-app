import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function TodoItem({todo, registerItem, itemsRef, edit, draggedId, dragOverId, setDragOverId, handleDragStart, handleDragEnd, handleDrop, deleteTodo, toggleTodo, startEdit, updateTodo, cancelEdit}) {
    
    const [editValue, setEditValue] = useState(todo.text)
    const [isDragging, setIsDragging] = useState(false)
    const itemRef = useRef(null);

    useEffect(() => {
        const unRegister = registerItem(todo.id, itemRef);
        
        return unRegister;
        
    }, [todo.id, registerItem])

    const isEditing = edit === todo.id;

    const formatDate = (date) => {
        return new Date(date).toLocaleString()
    }

    useEffect(() => {

    const handlePointerMove = (e) => {

    if(!isDragging) return;

    let target = null;

    Object.entries(itemsRef.current).forEach(([id, ref]) => {

        if(!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const isInside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if(isInside && Number(id) !== todo.id) {
            target = Number(id);
        }
    });
    setDragOverId(target);
}

        const handlePointerUp = () => {

        if(dragOverId !== null) {
            handleDrop(dragOverId)
        }

        setIsDragging(false)
        handleDragEnd()
}

        document.addEventListener("pointermove", handlePointerMove)
        document.addEventListener("pointerup", handlePointerUp)

        return () => {
            document.removeEventListener("pointermove", handlePointerMove)
            document.removeEventListener("pointerup", handlePointerUp)
        }

    }, [isDragging, handleDragEnd, dragOverId])

    
    return (
        <motion.div 
        ref={itemRef}
        className={`todo-item ${isDragging ? "dragging" : ""} ${dragOverId === todo.id ? "drag-over" : ""}`}

        onPointerDown={() => {
            setIsDragging(true)
            handleDragStart(todo.id)
        }}

        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, x: -50 }}

        >

            <div className="todo-content">

                <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
                    {isEditing ? (
                        <input 
                            value={editValue}

                            onChange={(e) => setEditValue(e.target.value)}

                            onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    updateTodo(todo.id, editValue)
                                }

                                if(e.key === "Escape") {
                                    cancelEdit()
                                }
                            }}
                        />
                    ) : (
                        todo.text
                    )}
                </div>


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
                        startEdit(todo.id)
                    }

                }}>
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