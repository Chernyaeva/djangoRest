import React from 'react';
import logo from './logo.svg';
import './App.css';
import NotesUsersList from './components/NotesUser.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'notes_users': []
        }
    }
//    componentDidMount() {
//    const notes_users = [
//        {
//            'first_name': 'Фёдор',
//            'last_name': 'Достоевский',
//            'birthday_year': 1821
//        },
//        {
//            'first_name': 'Александр',
//            'last_name': 'Грин',
//            'birthday_year': 1880
//            },
//        ]
//    this.setState(
//        {
//            'notes_users': notes_users
//        }
//    )
//    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/notes_users')
                .then(response => {
                    const notes_users = response.data
                        this.setState(
                        {
                            'notes_users': notes_users
                        }
                    )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <Menu/>
                <NotesUsersList notes_users={this.state.notes_users} />
                <Footer/>
            </div>

        )
    }
}


export default App;
