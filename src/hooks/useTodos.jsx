import { useEffect, useState } from "react"

    const initialTodos = [
        {
            id:1, text: "Breakfast", completed: true
        },

        {
            id:2, text: "Dinner", completed: false
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

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const filteredTodos = todos.filter((todo) => {
        if(filter === "all") return true;
        if(filter === "completed") return todo.completed;
        if(filter === "active") return !todo.completed;
    })

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter((todo) => todo.id !== id));
    }

    const addTodo = () => {
        const text = input.trim();
        if(text === ""){
            return;
        }
        if(todos.some(todo => todo.text === text)){
            setError("This task already exists");
            return;
        }
        setTodos((prev) => [... prev, {id: Date.now(), text: text, completed: false}]
    )
        setInput("");
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

    return {
        todos, input, error, handleInputChange, deleteTodo, addTodo, filter, filteredTodos, toggleTodo, setFilter, setInput
    }
}