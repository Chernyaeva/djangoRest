import React from 'react';
import logo from './logo.svg';
import './App.css';
import NotesUsersList from './components/NotesUser.js';
import TODOsList from './components/TODO.js';
import TODOForm from './components/TODOforms.js';
import ProjectForm from './components/ProjectForms.js';
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

    deleteProject(url) {
        const headers = this.get_headers()
        axios.delete(`${url}`, {headers, headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((Project)=>Project.url !== url)})
            }).catch(error => console.log(error))
    }

    deleteTODO(url) {
        const headers = this.get_headers()
        axios.delete(`${url}`, {headers, headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((TODO)=>TODO.url !== url)})
            }).catch(error => console.log(error))
    }

    createTODO(text, creator) {
        const headers = this.get_headers()
        const data = {text: text, project: ['http://127.0.0.1:8000/api/projects/1/'], creator: ['http://127.0.0.1:8000/api/notes_users/'+creator+'/']}
        axios.post(`http://127.0.0.1:8000/api/notes/`, data, {headers, headers})
        .then(response => {
            let new_TODO = response.data
            const creator = this.state.notes_users.filter((item) => item.id ===
            new_TODO.creator)[0]
            new_TODO.creator = creator
            this.setState({notes: [...this.state.notes, new_TODO]})
        }).catch(error => console.log(error))
    }

    createProject(name, users) {
            const headers = this.get_headers()
            const data = {name: name, project_users: ['http://127.0.0.1:8000/api/notes_users/'+users+'/']}
            axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_Project = response.data
                const name = this.state.notes_users.filter((item) => item.id ===
                new_Project.name)[0]
                new_Project.name = name
                this.setState({projects: [...this.state.projects, new_Project]})
            }).catch(error => console.log(error))
        }

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
                    <Route exact path='/notes' component={() => <TODOsList TODOs={this.state.notes} deleteTODO={(url)=>this.deleteTODO(url)}/>} />
                    <Route exact path='/projects' component={() => <ProjectsList Projects={this.state.projects} deleteProject={(url)=>this.deleteProject(url)} />} />
                    <Route exact path='/login' component={() => <LoginForm get_token={(username,password) => this.get_token(username, password)} />} />
                    <Route exact path='/notes/create' component={() => <TODOForm
                        notes_users={this.state.notes_users} createTODO={(text, creator) => this.createTODO(text, creator)} />} />
                     <Route exact path='/projects/create' component={() => <ProjectForm
                        createProject={(name, users) => this.createProject(name, users)} />} />
                    <Route component={NotFound404} />
                </Switch>
                </BrowserRouter>
            </div>

        )
    }
}


export default App;
