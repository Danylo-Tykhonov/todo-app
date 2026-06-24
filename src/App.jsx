import useTodos from "./hooks/useTodos";
import "./App.css";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import TodoForm from "./components/TodoForm";

export default function App(){
    const {input, error, registerItem, itemsRef, handleInputChange, handleDrop, handleDragEnd, handleDragStart, deleteTodo, edit, startEdit, cancelEdit, addTodo, filter, filteredTodos, toggleTodo, setFilter, activeTodos, clearCompleted, updateTodo, draggedId, dragOverId, setDragOverId} = useTodos();
    return(
        <div className="app">
        
            <TodoForm 
                input={input}
                handleInputChange={handleInputChange}
                addTodo={addTodo}
            />

            <div className="counter">
                {activeTodos} tasks left
            </div>

            {error.length === 0 ? "" : error }

            <FilterButtons 
                filter={filter}
                setFilter={setFilter}
                clearCompleted={clearCompleted}
            />
           
            <TodoList
                filteredTodos={filteredTodos}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
                cancelEdit={cancelEdit}
                startEdit={startEdit}
                edit={edit}
                draggedId={draggedId}
                dragOverId={dragOverId}
                setDragOverId={setDragOverId}
                handleDrop={handleDrop}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                registerItem={registerItem}
                itemsRef={itemsRef}
            />
        </div>
    )
}