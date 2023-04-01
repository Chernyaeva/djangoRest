import React from 'react'
class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', creator: 0}
    }
    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createTODO(this.state.text, this.state.creator)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
                <label for="login">text</label>
                <input type="text" className="form-control" name="text"
                value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
                <label for="creator">creator</label>
                <input type="number" className="form-control" name="creator"
                value={this.state.creator} onChange={(event)=>this.handleChange(event)} />
            </div>
            <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default TODOForm