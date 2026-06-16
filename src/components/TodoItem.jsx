export default function TodoItem({todo, deleteTodo, toggleTodo}) {
    return (
        <div className="todo-item">

            <div className={`todo-text ${todo.completed ? "completed" : ""}`}>
                {todo.text}
            </div>

            <div className="todo-buttons">
                <button onClick={() => deleteTodo(todo.id)}>
                    X
                </button>

                <button onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? "Undo" : "Done"}
                </button>
            </div>

        </div>
    )
}