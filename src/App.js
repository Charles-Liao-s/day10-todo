import { createContext, useContext, useReducer, useState } from "react";
import './App.css';
export const initState = [
    { id: 1, text: "the first todo", done: false },
    { id: 2, text: "the second todo", done: false },
];
export const TodoContext = createContext();

function TodoItem(props) {
    const { dispatch } = useContext(TodoContext);
    const { todo } = props;

    function makeAsDone() {
        dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } });
    }

    return (
        <div className="todo-item">
            <span
                className={`todo-text ${todo.done ? "todo-done" : ""}`}
                onClick={makeAsDone}
            >
                {todo.text}
            </span>
            <button
                onClick={() => dispatch({ type: "DELETE_TODO", payload: { id: todo.id } })}
                style={{ marginLeft: "8px", background: "#ccc", border: "none", color: "black", padding: "4px", borderRadius: "4px" }}
            >
                X
            </button>
        </div>
    );
}

function TodoGroup() {
    const { state } = useContext(TodoContext);
    return (
        <div className="todo-list">
            {state.length > 0 ? (
                state.map((item) => (
                    <TodoItem key={item.id} todo={item} />
                ))
            ) : (
                <div className="empty-state">No todos yet!</div>
            )}
        </div>
    );
}

export function todoReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_TODO":
            const newState = [...state];
            const id = action.payload.id;
            return newState.map((value) => {
                if (value.id === id) {
                    return { ...value, done: !value.done };
                }
                return value;
            });

        case "DELETE_TODO":
            return state.filter((item) => item.id !== action.payload.id);

        case "ADD_TODO":
            return [...state, action.payload];

        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(todoReducer, initState);
    const [inputValue, setInputValue] = useState('');

    function handleAddTodo() {
        if (inputValue.trim() === '') return;
        dispatch({
            type: "ADD_TODO",
            payload: { id: Date.now(), text: inputValue, done: false }
        });
        setInputValue('');
    }

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <TodoContext.Provider value={{ state, dispatch }}>
                <TodoGroup />
            </TodoContext.Provider>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Add the things you need to do today..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleAddTodo}>
                    add
                </button>
            </div>
        </div>
    );
}

export default App;
