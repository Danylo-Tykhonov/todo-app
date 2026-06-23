import TodoItem from "./TodoItem";
import { AnimatePresence } from "framer-motion";

export default function TodoList({filteredTodos, handleDrop, handleDragEnd, handleDragStart, deleteTodo, toggleTodo, startEdit, edit, updateTodo, cancelEdit, draggedId}) {
    if(filteredTodos.length === 0) {
        return <div>No tasks</div>
    }
    return(
        <div className="todo-list">
            <AnimatePresence>
            {filteredTodos.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    startEdit={startEdit}
                    edit={edit}
                    cancelEdit={cancelEdit}
                    updateTodo={updateTodo}
                    draggedId={draggedId}
                    handleDrop={handleDrop}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                />
            ))}
            </AnimatePresence>
        </div>
    )
}