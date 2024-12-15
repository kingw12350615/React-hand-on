import NewTask from "./NewTask";
import { useContext } from "react";
import { ProjectManagerCtx } from "../store/ProjectManagerContext";

export default function Tasks({tasks}) {

    const {handleDeleteTask} = useContext(ProjectManagerCtx);

    let tasksContent;
    if (tasks.length > 0) {
        tasksContent = 
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between my-4">
                        <span>{task.name}</span>
                        <button className="text-stone-700 hover:text-red-500" onClick={() => handleDeleteTask(task.id)}>Clear</button>
                    </li>))}
            </ul>
    } else {
        tasksContent = 
            <p className="text-stone-800 mb-4">
                This project does not have any tasks yet.
            </p>
    }

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask />
            {tasksContent}
        </section>
    );
}