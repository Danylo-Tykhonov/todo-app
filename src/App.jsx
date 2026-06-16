import useTodos from "./hooks/useTodos";
import "./App.css";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import TodoForm from "./components/TodoForm";

export default function App(){
    const {input, error, handleInputChange, deleteTodo, addTodo, filter, filteredTodos, toggleTodo, setFilter} = useTodos();
    return(
        <div className="app">
        
            <TodoForm 
                input={input}
                handleInputChange={handleInputChange}
                addTodo={addTodo}
            />

            {error.length === 0 ? "" : error }

            <FilterButtons 
                filter={filter}
                setFilter={setFilter}
            />
           
            <TodoList
                filteredTodos={filteredTodos}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}