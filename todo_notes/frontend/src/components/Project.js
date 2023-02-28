import React from 'react'

const ProjectItem = ({Project}) => {
    return (
        <tr>
            <td>
                {Project.name}
            </td>
            <td>
                {Project.repo_link}
            </td>
            <td>
                {Project.project_users}
            </td>
        </tr>
    )
}

const ProjectsList = ({Projects}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Link to Repa
            </th>
            <th>
                Project users
            </th>
            {Projects.map((Project) => <ProjectItem Project={Project} />)}
        </table>
    )
}
export default ProjectsList
