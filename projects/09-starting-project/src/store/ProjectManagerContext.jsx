import { createContext, useState } from "react";

export const ProjectManagerCtx = createContext(
    {
        handleAddProject: () => {},
        handleSave: (project) => {},
        handleAddCancel: () => {},
        handleSelectProject: (projectId) => {},
        handleDeleteProject: () => {},
        handleAddTask: (taskId) => {},
        handleDeleteTask: (taskId) => {},
        projects: [],
        selectProjectId: undefined
    }
);

export default function ProjectManagerCtxProvider({ children }) {

    const [projectState, setProjectState] = useState(
        {
            selectProjectId: undefined,
            projects: []
        }
    );

    function handleAddProject() {
        console.log("handleAddProject");
        setProjectState(preState => {
            return {
                ...preState,
                selectProjectId: null
            }
        });
    }

    function handleSave(project) {
        const projectId = Math.random().toString();
        setProjectState(preState => {
            const newProject = {
                ...project,
                id: projectId,
                tasks: []
            };
            return {
                ...preState,
                selectProjectId: undefined,
                projects: [...preState.projects, newProject]
            }
        });
    }

    function handleAddCancel() {
        setProjectState(preState => {
            return {
                ...preState,
                selectProjectId: undefined
            }
        });
    }

    function handleSelectProject(id) {
        setProjectState(preState => {
            return {
                ...preState,
                selectProjectId: id
            }
        });
    }

    function handleDeleteProject() {
        setProjectState(preState => {
            return {
                ...preState,
                selectProjectId: undefined,
                projects: preState.projects.filter(project => project.id !== preState.selectProjectId)
            }
        });
    }

    function handleAddTask(taskName) {

        if(taskName.trim() === ''){
            return;
        }

        setProjectState(preState => {
            const project = preState.projects.find(project => project.id === preState.selectProjectId);
            const newTasks = [...project.tasks, { id: Math.random().toString(), name: taskName }];
            const newProject = {
                ...project,
                tasks: newTasks
            }
            return {
                ...preState,
                projects: [...preState.projects.filter(p => p.id !== preState.selectProjectId), newProject]
            }
        });
    }

    function handleDeleteTask(taskId) {
        setProjectState(preState => {
            const project = preState.projects.find(project => project.id === preState.selectProjectId);
            const newTasks = [...project.tasks.filter(task => task.id !== taskId)];
            const newProject = {
                ...project,
                tasks: newTasks
            }
            return {
                ...preState,
                projects: [...preState.projects.filter(p => p.id !== preState.selectProjectId), newProject]
            }
        });
    }

    const contextValue = {
        handleAddProject: handleAddProject,
        handleSave: handleSave,
        handleAddCancel: handleAddCancel,
        handleSelectProject: handleSelectProject,
        handleDeleteProject: handleDeleteProject,
        handleAddTask: handleAddTask,
        handleDeleteTask: handleDeleteTask,
        ...projectState
    }

    return (
        <ProjectManagerCtx.Provider value={contextValue}>
            {children}
        </ProjectManagerCtx.Provider>
    );
}