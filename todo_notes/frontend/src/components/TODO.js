import React from 'react'
import {Link} from 'react-router-dom'

const TODOItem = ({TODO, deleteTODO}) => {
    return (
        <tr>
            <td>{TODO.url}</td>
            <td>{TODO.project}</td>
            <td>{TODO.text}</td>
            <td>{TODO.creator}</td>
            <td><button onClick={()=>deleteTODO(TODO.url)} type='button'>Delete</button></td>
        </tr>
    )
}

const TODOsList = ({TODOs, deleteTODO}) => {
    return (
        <div>
        <table>
            <tr>
                <th>TODO url</th>
                <th>Project name</th>
                <th>What to do</th>
                <th>Creator</th>
                <th></th>
            </tr>
            {TODOs.map((TODO) => <TODOItem TODO={TODO} deleteTODO={deleteTODO}/>)}
        </table>
        <Link to='/notes/create'>Create</Link>
        </div>
    )
}
export default TODOsList
