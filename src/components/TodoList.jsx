import TodoItem from "./TodoItem";

export default function TodoList({filteredTodos, deleteTodo, toggleTodo, editing}) {
    return(
        <div className="todo-list">
            {filteredTodos.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    editing={editing}
                />
            ))}
        </div>
    )
}