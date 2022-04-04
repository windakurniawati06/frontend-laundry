import React from "react"
import axios from "axios"
import './Login.css';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    loginProcess(event) {
        event.preventDefault()
        let endpoint = "http://localhost:8000/login"
        let request = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, request)
            .then(result => {
                if (result.data.logged) {
                    localStorage.setItem("token", result.data.token)
                    localStorage.setItem(
                        "user", JSON.stringify(result.data.user)
                    )
                    window.alert("Congratulations! You have successfully logged in! Have a good day!<3")
                    window.location.href = "/"
                } else {
                    window.alert("Can't login:( Please check your username and password!")
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="login">
            <div className="loginContainer">
                <div >
                    <div>
                        <label>Login</label>
                        <form onSubmit={ev => this.loginProcess(ev)}>
                            <input type="text" placeholder="Username" className="mb-3"
                                required value={this.state.username}
                                onChange={ev => this.setState({ username: ev.target.value })} />
                            <input type="password" placeholder="Password" className="mb-3"
                                required value={this.state.username.password}
                                onChange={ev => this.setState({ password: ev.target.value })} />
                            <button type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default Login