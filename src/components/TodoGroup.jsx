import { useContext } from "react";
import { TodoContext } from "../App";
import TodoItem from "./TodoItem";

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

export default TodoGroup;