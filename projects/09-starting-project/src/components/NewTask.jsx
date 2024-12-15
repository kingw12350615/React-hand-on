import { useRef } from "react";
import { useContext } from "react";
import {ProjectManagerCtx} from "../store/ProjectManagerContext";

export default function NewTask() {

    const {handleAddTask} = useContext(ProjectManagerCtx);

    const input = useRef();

    function onClick(){
        const taskName = input.current.value;
        input.current.value = "";
        handleAddTask(taskName);
    }

    return (
        <div className="flex item-center gap-4">
            <input ref={input} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
            <button className="text-stone-700 hover:text-stone-950" onClick={onClick}>Add Task</button>
        </div>
    );
}