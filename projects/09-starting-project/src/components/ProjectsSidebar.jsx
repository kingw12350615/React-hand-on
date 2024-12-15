import Button from "./Button";
import { useContext } from "react";
import {ProjectManagerCtx} from "../store/ProjectManagerContext";

export default function ProjectsSidebar() {
    
    const {handleAddProject, handleSelectProject, projects, selectProjectId} = useContext(ProjectManagerCtx);

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            {/* Add Button */}
            <div>
                <Button onClick={handleAddProject} className="px-4 py-2 text-xs md:text-base round-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
                    + Add Project
                </Button>
            </div>
            {/* Dispaly projects created */}
            <ul className="mt-8">
               
               {projects.map(project => {

                let buttonCss = "w-full text-left px-2 py-1 rounded-sm hover:text-stone-200 hover:bg-stone-800";

                if(project.id === selectProjectId){
                    buttonCss += " bg-stone-800 text-stone-200";
                }else{
                    buttonCss += " text-stone-400";
                }

                return <li key={project.id}>
                    <button className={buttonCss} onClick={() => handleSelectProject(project.id)}>
                        {project.title}
                    </button>
                </li>
               })} 
            </ul>
        </aside>
    );
}