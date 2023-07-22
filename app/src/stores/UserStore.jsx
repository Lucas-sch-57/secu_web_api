import { createContext } from "react"
import { makeAutoObservable } from "mobx"
import axios from "axios"
class UserStore {
    user = null
    userRole = null
    constructor() {
        makeAutoObservable(this)
        this.checkToken()
    }

    checkToken = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            await axios
                .get("http://localhost:3001/api/auth/check", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    this.userRole = res.data.user.role
                    this.user = token
                })
                .catch((err) => {
                    console.log(err)
                    this.user = null
                    localStorage.removeItem("token")
                })
        }
    }


    login = async (username, password) => {
        axios.post('http://localhost:3001/api/auth/login', {
            "username": username,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.user = response.data.token
            this.userRole = response.data.role
            localStorage.setItem('token', response.data.token)
        }).catch(error => {
            console.log(error)
        })
    }

    changeUsername = async (username) => {
        axios.patch('http://localhost:3001/api/user/username-change/', { username }).then(response => {
            this.user = response.data.token
            localStorage.setItem('token', response.data.token)
        }).catch(error => {
            console.log(error)
        })
    }

    changePassword = async (password) => {
        axios.put('http://localhost:3001/api/user/password-change/', { password }).then(response => {
            this.user = response.data.token
            localStorage.removeItem('token', response.data.token)
        }).catch(error => {
            console.log(error)
        })
    }


    get isLoggedIn() {
        return !!this.user
    }

    get isAdmin() {
        return this.userRole === 'admin'
    }
}

const userStore = new UserStore()
export default userStore;
export const userContext = createContext(userStore);
