import React from 'react'

const NotesUserItem = ({notes_user}) => {
    return (
        <tr>
            <td>
                {notes_user.first_name}
            </td>
            <td>
                {notes_user.last_name}
            </td>
            <td>
                {notes_user.birthday_year}
            </td>
        </tr>
    )
}

const NotesUsersList = ({notes_users}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Birthday year
            </th>
            {notes_users.map((notes_user) => <NotesUserItem notes_user={notes_user} />)}
        </table>
    )
}
export default NotesUsersList
