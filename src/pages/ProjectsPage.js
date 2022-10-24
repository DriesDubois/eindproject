import {Projects} from "../components/Projects";
import {PROJECTS_DATA} from "../data/projectsdata";

export function ProjectsPage() {

    return (
            <Projects projects={PROJECTS_DATA} title="alle projecten"/>

    );
}