import { useEffect, useState } from "react"

    const initialTodos = [
        {
            id:1, text: "Breakfast", completed: true, createdAt: Date.now()
        },

        {
            id:2, text: "Dinner", completed: false, createdAt: Date.now() 
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

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const filteredTodos = todos.filter((todo) => {
        if(filter === "all") return true;
        if(filter === "completed") return todo.completed;
        if(filter === "active") return !todo.completed;
    })

    const activeTodos = todos.filter(todo => !todo.completed).length;

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter((todo) => todo.id !== id));
    }

    const clearCompleted = () => {
        setTodos(prev => prev.filter((todo) => !todo.completed))
    }

    const isDuplicate = (text, id = null) => {
        return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase() && todo.id !== id)
    }

    const handleDragStart = (id) => {
        setDraggedId(id);
        if (typeof document !== "undefined") {
            document.body.classList.add("dragging");
        }
    }

    const handleDragEnd = (id) => {
        setDraggedId(null);
        if (typeof document !== "undefined") {
            document.body.classList.remove("dragging");
        }
    }

    const handleDrop = (id) => {
        setTodos((prev) => {
            const draggedIndex = prev.findIndex((todo) => todo.id === draggedId);
            const targetIndex = prev.findIndex((todo) => todo.id === id);

            if(draggedIndex === -1 || targetIndex === -1) {
                return prev;
            }
            const newTodos = [...prev]

            const draggedTodo = newTodos.splice(draggedIndex, 1)[0];

            newTodos.splice(targetIndex, 0, draggedTodo);
            
            return newTodos;
        })
            setDraggedId(null);
            if (typeof document !== "undefined") {
                document.body.classList.remove("dragging");
            }
    }

    const addTodo = () => {
        const text = input.trim();
        if(text === ""){
            return;
        }
        if(isDuplicate(text)){
            setError("This task already exists");
            return;
        }
        setTodos((prev) => [... prev, 
            {
                id: Date.now(), text: text, completed: false, createdAt: Date.now()
            }
        ]
    )
        setInput("");
}

    const updateTodo = (id, text) => {
        const value = text.trim();
        if(value === ""){
            return;
    }

        if(isDuplicate(value, id)){
            setError("This task already exists");
            return;
    }
        setTodos((prev) => {
            return prev.map((todo) => {
                if(todo.id === id) {
                    return {...todo, text: value}
                }
                
                return todo;
            })
        })
        setEdit(null);
        setError("");
    }

    const toggleTodo = (id) => {
        setTodos((prev) => {
            return prev.map((todo) => {
            if(todo.id === id) {
                return {... todo, completed: !todo.completed}
            }
            else{
                return todo;
            }
            })
        })
    }

    const handleInputChange = (value) => {
        setInput(value)
        setError("");
    }

    const startEdit = (id) => {
        setEdit(id);
    }

    const cancelEdit = () => {
        setEdit(null);
    }

    return {
        todos, input, error, edit, startEdit, cancelEdit, handleInputChange, deleteTodo, addTodo, filter, filteredTodos, draggedId, handleDragStart, handleDragEnd, handleDrop, toggleTodo, setFilter, clearCompleted, activeTodos, updateTodo
    }
}