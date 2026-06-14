import useTodos from "./hooks/useTodos";
export default function App(){
    const {todos, input, deleteTodo, addTodo, filter, filteredTodos, toggleTodo, setFilter, setInput} = useTodos();

    return(
        <div>

            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />


            <button onClick={addTodo}>
                Add
            </button>


            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>

            {filteredTodos.map((todo) => (
                <div key={todo.id}> 
                {todo.text}
                
            <button onClick={() => deleteTodo(todo.id)}>
                X
            </button>

            <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "Undo" : "Done"}
            </button>
                </div>
            ))}
        </div>
    )
}