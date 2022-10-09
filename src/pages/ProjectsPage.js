import {Projects} from "../components/Projects";

export function ProjectsPage(props) {
    const {projects} = props
    return (
            <Projects projects={projects} title="alle projecten"/>

    );
}