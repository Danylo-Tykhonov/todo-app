import useTodos from "./hooks/useTodos";
import "./App.css";

export default function App(){
    const {todos, input, deleteTodo, addTodo, filter, filteredTodos, toggleTodo, setFilter, setInput} = useTodos();
    return(
        <div className="app">
           <div className="header">
              <div className="input">
            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {if(e.key === "Enter"){
                addTodo();
            }}}
            />
        </div>
  
            <button onClick={addTodo}>Add</button>

        </div>
           
            <div className="filter-buttons">
            <button className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}>All</button>
            <button className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}>Active</button>
            <button className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}>Completed</button>
            </div>
           
            <div className="todo-list">
            {filteredTodos.map((todo) => (
                <div key={todo.id} className="todo-item"> 
                <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                 </div>
            <div className="todo-buttons">    
            <button onClick={() => deleteTodo(todo.id)}>X </button>
            <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "Undo" : "Done"}
            </button>
            </div>
                </div>
            ))}
            </div>  
        </div>
    )
}