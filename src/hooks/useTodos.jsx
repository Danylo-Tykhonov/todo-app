import { del } from "framer-motion/client";
import { useEffect, useRef, useState } from "react"

const initialTodos = [
    {
        id:1,
        text: "Breakfast",
        completed: true,
        createdAt: Date.now()
    },

    {
        id:2,
        text: "Dinner",
        completed: false,
        createdAt: Date.now() 
    }
]

export default function useTodos() {

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos")
        return saved ? JSON.parse(saved) : initialTodos;
    });

    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all")
    const [error, setError] = useState("");

    const [edit, setEdit] = useState(null);

    const [draggedId, setDraggedId] = useState(null);
    const [dragOverId, setDragOverId] = useState(null);

    const itemsRef = useRef({});

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const filteredTodos = todos.filter((todo) => {

        if(filter === "all") return true;

        if(filter === "completed") {
            return todo.completed;
        }

        if(filter === "active") {
            return !todo.completed;
        }

    })

    const activeTodos = todos.filter(todo => !todo.completed).length;

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id)
        );
    }

    const clearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.completed)
        );
    }

    const isDuplicate = (text, id = null) => {
        return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase() && todo.id !== id
        )
    }

    const handleDragStart = (id) => {
        setDraggedId(id);
    }

    const handleDragEnd = () => {
        setDraggedId(null);
        setDragOverId(null);
    }

    const registerItem = (id, ref) => {
        itemsRef.current[id] = ref;

        return() => {
            delete itemsRef.current[id];
        }
    }

    const handleDrop = (id) => {

        setTodos(prev => {
            const draggedIndex =
                prev.findIndex(todo => todo.id === draggedId);

            const targetIndex =
                prev.findIndex(todo => todo.id === id);

            if( draggedIndex === -1 || targetIndex === -1) {
                return prev;
            }

            const newTodos = [...prev];

            const draggedTodo = newTodos.splice(draggedIndex,1)[0];
            
            newTodos.splice( targetIndex, 0, draggedTodo
            );
            return newTodos;
        });

        handleDragEnd();
    }

    const addTodo = () => {

        const text = input.trim();

        if(text === "") return;

        if(isDuplicate(text)){
            setError("This task already exists");
            return;
        }

        setTodos(prev => [...prev,
            {
                id: Date.now(),
                text,
                completed:false,
                createdAt:Date.now()
            }
        ])
        setInput("");
    }

    const updateTodo = (id,text)=> {

        const value = text.trim();

        if(value === "") return;

        if(isDuplicate(value,id)){
            setError("This task already exists");
            return;
        }

        setTodos(prev =>
            prev.map(todo => todo.id === id ? {...todo,text:value} : todo)
        )
        setEdit(null);
        setError("");

    }

    const toggleTodo = (id)=>{

        setTodos(prev =>
            prev.map(todo => todo.id === id ? { ...todo, completed:!todo.completed } :todo)
        )

    }

    const handleInputChange = (value)=>{
        setInput(value);
        setError("");
    }

    
    const startEdit=(id)=>{
        setEdit(id);
    }

    const cancelEdit=()=>{
        setEdit(null);
    }

    return { todos, input, error, edit, filter, setFilter, filteredTodos, activeTodos, addTodo, deleteTodo, clearCompleted, toggleTodo, updateTodo, handleInputChange, startEdit, cancelEdit, draggedId, dragOverId, handleDragStart, handleDragEnd, setDragOverId, handleDrop, itemsRef, registerItem}

}