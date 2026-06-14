import { useEffect, useState } from "react"

export default function useTodos() {
    const initialTodos = [
        {
            id:1, text: "Breakfast", completed: true
        },

        {
            id:2, text: "Dinner", completed: false
        }
    ]
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos")
        return saved ? JSON.parse(saved) : initialTodos;
    });
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all")

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
        if(input.trim() === ""){
            return;
        }
        if(todos.some(todo => todo.text === input)){
            return;
        }
        setTodos((prev) => [... prev, {id: Date.now(), text: input, completed: false}]
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

    return {
        todos, input, deleteTodo, addTodo, filter, filteredTodos, toggleTodo, setFilter, setInput
    }
}