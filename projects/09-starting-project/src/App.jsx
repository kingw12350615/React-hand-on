import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";
import { useContext } from "react";
import {ProjectManagerCtx} from "./store/ProjectManagerContext";

function App() {

  const {projects, selectProjectId} = useContext(ProjectManagerCtx);

  // Determine which block to show on right side
  let content;
  if (selectProjectId === undefined) {
    content = <NoProjectSelected />;
  } else if (selectProjectId === null) {
    content = <NewProject />;
  } else {
    content = <SelectedProject project={projects.find(project => project.id === selectProjectId)} />;
  }

  return (
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar/>
        {content}
      </main>
  );
}

export default App;
