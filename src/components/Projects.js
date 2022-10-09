import {ProjectCard} from "./ProjectCard";

export function Projects(props) {
    const {projects, title} = props

    return (
        <div title={title}>
            {projects.map((p, index) => <Project key={index} project={p}/>)}
        </div>
    )
}

function Project(props) {
    const {project} = props;

    return (
        <ProjectCard>
            {project?.title && <div>{project.title}</div>}
            {project?.picturePathName && <img src={`images/${project.picturePathName}`}
                                              width="100%"
                                              alt={`${project.picturePathName}`}/>}
        </ProjectCard>
    )
}