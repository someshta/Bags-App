import React from "react";
import Styles from "./SignIn.css";
// import Nav from '../../components/Nav';
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from "axios";

class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        message: ''
    };


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            // [event.target.password]: event.target.value
        }); 
    }

    handleSubmit = event => {
            event.preventDefault();
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post('/login', user)
            .then(response => {
            
            const {error, user} = response.data;

            if(response.data.status === 401){
                console.log("user does not exist");
                this.setState({message: "User does not exist"})
            }else if(response.data === "password is incorrect"){
                this.setState({message: "Password is incorrect"})
            }
            else {
                this.setState({message: "Hello " + user.name})

                // once you know its a valid user
                localStorage.setItem('userId', user._id);
                localStorage.setItem('userPhone', user.phone);

                this.props.history.push("/userhome");
            }
            })
            .catch(function (error) {
            console.log(error);
            });
    }
    
    render(){
        return(
                <div className="container-fluid">
                    <div className="row sign-in-up-row">
                    {/* <div className="col-sm sign-in-up-color-blck"></div> */}
                        <div className="col-sm sign-in-up-col">
                            <div className="sign-in-up-div">
                                <h2 className="sign-in-up-header">Sign in!</h2>
                                <hr/>
                                <h5 className="success-msg"> {this.state.message}</h5>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    </div>
                                    <input className="sign-in-up-btn" type="submit" value="Sign In"/><br />
                                    <Link to="/createaccount" className={window.location.pathname === "/createaccount" ? "nav-link" : "nav-link"}>Don't have an account? Create one here.</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

export default SignIn;