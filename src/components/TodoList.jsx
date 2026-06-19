import TodoItem from "./TodoItem";

export default function TodoList({filteredTodos, deleteTodo, toggleTodo, startEdit, edit, updateTodo, cancelEdit}) {
    if(filteredTodos.length === 0) {
        return <div>No tasks</div>
    }
    return(
        <div className="todo-list">
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

                />
            ))}
        </div>
    )
}