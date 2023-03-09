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
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'notes_users': [],
            'notes': [],
            'projects': [],
            'token': ''
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

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
            let headers = {
                'Content-Type': 'application/json'
            }
            if (this.is_authenticated())
                {
                headers['Authorization'] = 'Token ' + this.state.token
                }
            return headers
        }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/notes_users', {headers})
                .then(response => {
                    const notes_users = response.data.results
                        this.setState(
                        {
                            'notes_users': notes_users
                        }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({notes_users: []})
            })
        axios.get('http://127.0.0.1:8000/api/notes', {headers})
                .then(response => {
                    const notes = response.data.results
                        this.setState(
                        {
                            'notes': notes
                        }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({notes: []})
            })
        axios.get('http://127.0.0.1:8000/api/projects', {headers})
                .then(response => {
                    const projects = response.data.results
                        this.setState(
                        {
                            'projects': projects
                        }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
    }

    componentDidMount() {
        this.get_token_from_storage()
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
                        <li>
                            {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <NotesUsersList notes_users={this.state.notes_users} />} />
                    <Route exact path='/notes' component={() => <TODOsList TODOs={this.state.notes}/>} />
                    <Route exact path='/projects' component={() => <ProjectsList Projects={this.state.projects}/>} />
                    <Route exact path='/login' component={() => <LoginForm get_token={(username,password) => this.get_token(username, password)} />} />

                    <Route component={NotFound404} />
                </Switch>
                </BrowserRouter>
            </div>

        )
    }
}


export default App;
