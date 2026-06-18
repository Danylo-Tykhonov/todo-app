import useTodos from "./hooks/useTodos";
import "./App.css";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import TodoForm from "./components/TodoForm";

export default function App(){
    const {input, error, handleInputChange, deleteTodo, edit, editing, saveEdit, cancelEdit, addTodo, filter, filteredTodos, toggleTodo, setFilter, activeTodos} = useTodos();
    return(
        <div className="app">
        
            <TodoForm 
                input={input}
                handleInputChange={handleInputChange}
                addTodo={addTodo}
                edit={edit}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
            />

            <div className="counter">
                {activeTodos} tasks left
            </div>

            {error.length === 0 ? "" : error }

            <FilterButtons 
                filter={filter}
                setFilter={setFilter}
            />
           
            <TodoList
                filteredTodos={filteredTodos}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editing={editing}
            />
        </div>
    )
}