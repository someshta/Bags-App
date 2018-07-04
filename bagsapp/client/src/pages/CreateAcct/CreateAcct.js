import React from "react";
import Styles from "./CreateAcct.css";
import Nav from '../../components/Nav';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

class CreateAcct extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: '',
        phone: '',
        successMsg: ''
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.password !== this.state.passwordConf) {
            var err = ('Passwords do not match.');
            this.setState({
                successMsg: err
            });
        }
        
        else if(this.state.name && 
            this.state.email && 
            this.state.password && 
            this.state.passwordConf && 
            this.state.phone) {

            const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
            }

            axios.post('/user', newUser)
            .then(response => {
                if(response.data.newUser) {
                    console.log("User created successfully");
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        passwordConf: '',
                        phone: '',
                        successMsg: "Hello " + response.data.newUser.name 
                    })            
                }      
            })
            .catch(function (error) {
            console.log(error);
            });
        
            console.log(newUser);
        }else {
            console.log("all fields required");
            this.setState({
                successMsg: "All fields are required"
            })
        }      
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm create">
                        <h2 id="createHeader"> Create an account</h2>
                        <hr />
                        <h5 id="successMsg">{this.state.successMsg}</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/></div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Confirm password</label>
                                <input type="password" name="passwordConf" value={this.state.passwordConf} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Confirm password"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Phone number</label>
                                <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone number"/>
                            </div>
                            <input id="createBtn" type="submit" value="Create Account" />
                            <Link id="already" to="/signin" className={window.location.pathname === "/signin" ? "nav-link" : "nav-link"}>Already have an account? Sign in here.</Link>
                        </form>
                    </div>    
                </div>
            </div>
        );
    }
}


export default CreateAcct;