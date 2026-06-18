export default function TodoItem({todo, deleteTodo, toggleTodo, editing}) {
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

                <button onClick={() => editing(todo.id, todo.text)}>
                    Edit
                </button>
            </div>
        </div>
    )
}