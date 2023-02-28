import React from 'react'

const TODOItem = ({TODO}) => {
    return (
        <tr>
            <td>
                {TODO.project}
            </td>
            <td>
                {TODO.text}
            </td>
            <td>
                {TODO.creator}
            </td>
        </tr>
    )
}

const TODOsList = ({TODOs}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                What to do
            </th>
            <th>
                Creator
            </th>
            {TODOs.map((TODO) => <TODOItem TODO={TODO} />)}
        </table>
    )
}
export default TODOsList
