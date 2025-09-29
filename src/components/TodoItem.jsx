import { useContext } from "react";
import { TodoContext } from "../App";

function TodoItem(props) {
    const { dispatch } = useContext(TodoContext);
    const { todo } = props;

    function makeAsDone() {
        dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } });
    }
    // 1111

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

export default TodoItem;