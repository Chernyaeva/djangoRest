import React from 'react';
import logo from './logo.svg';
import './App.css';
import NotesUsersList from './components/NotesUser.js';
import TODOsList from './components/TODO.js';
import ProjectsList from './components/Project.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import NotFound404 from './components/NotFound404.js';
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'notes_users': [],
            'notes': [],
            'projects': []
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
                    const notes_users = response.data.results
                        this.setState(
                        {
                            'notes_users': notes_users
                        }
                    )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/notes')
                .then(response => {
                    const notes = response.data.results
                        this.setState(
                        {
                            'notes': notes
                        }
                    )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects')
                .then(response => {
                    const projects = response.data.results
                        this.setState(
                        {
                            'projects': projects
                        }
                    )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/notes'>Notes</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <NotesUsersList notes_users={this.state.notes_users} />} />
                    <Route exact path='/notes' component={() => <TODOsList TODOs={this.state.notes}/>} />
                    <Route exact path='/projects' component={() => <ProjectsList Projects={this.state.projects}/>} />
                    <Route component={NotFound404} />
                </Switch>
                </BrowserRouter>
            </div>

        )
    }
}


export default App;
