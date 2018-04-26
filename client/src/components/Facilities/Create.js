import React, {Component} from 'react';
import axios from 'axios';

class CreateFacility extends Component {
    constructor(props){
        super(props);
        this.state = {
            'name':'',
            'isOpen':'true'
        }
    };

    toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const state = this.state;
        if (['name'].indexOf(name) !== -1){
            state[name] = this.toTitleCase(event.target.value);
        }
        else {
            state[name] = value;            
        }
        this.setState(state);
    };

    onSubmit = (e) => {
        // e.preventDefault();
        let name = this.state.name;
        let isOpen = this.state.isOpen;

        const header = { headers: {"Authorization": localStorage.getItem('token')}};
        const data = {name, isOpen};

        axios.post('/api/facilities', data, header)
        .then((res) => {
            this.props.history.push("/issues");
        }).catch(err => {
            console.log(err);
        });

    };

    render() {
        const { name, isOpen} = this.state;
        const options = ['true', 'false'];
        return (
          <div>
            <form className="form-signin" onSubmit={this.onSubmit}>
    
              <h2 className="form-signin-heading">Add a Facility</h2>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} required placeholder="name" />
              </div>
              <div className="form-group">
            <label>Is Open</label>
            <select className="form-control" name="isOpen" value={isOpen} onChange={this.onChange}>
              {options.map((option, i) => {
                return (
                  <option value={option} key={i}>{option}</option>
                )
              })}
            </select>
          </div>
              
              <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
    
            </form>
          </div>
        ); 
    }
}
export default CreateFacility;