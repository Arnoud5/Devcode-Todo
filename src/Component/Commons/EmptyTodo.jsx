import React from "react";
import emptyState from "./Assets/todo-empty-state.png"

const EmptyTodo = () => {
    return (
        <>
            <section className="w-11/12 md:max-w-xl xl:max-w-5xl mx-auto">
                <div data-cy="todo-empty-state" className="flex justify-center items-center h-[calc(100vh-200px)]">
                    <img className="w-1/2" src={emptyState} alt="Empty activity placeholder" />
                </div>
            </section>
        </>
    );
}

export default EmptyTodo;