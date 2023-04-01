import React from 'react'

const ProjectItem = ({Project, deleteProject}) => {
    return (
        <tr>
            <td>{Project.url}</td>
            <td>{Project.name}</td>
            <td>{Project.repo_link}</td>
            <td>{Project.project_users}</td>
            <td><button onClick={()=>deleteProject(Project.url)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectsList = ({Projects, deleteProject}) => {
    return (
        <table>
            <tr>
                <th>Project url </th>
                <th>Project name </th>
                <th>Link to Repa </th>
                <th>Project users </th>
                <th></th>
            </tr>
            {Projects.map((Project)  => <ProjectItem Project={Project} deleteProject={deleteProject}/>)}
        </table>
    )
}
export default ProjectsList
