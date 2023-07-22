import { createContext } from "react"
import { makeAutoObservable } from "mobx"
import axios from "axios"
class CommentStore {
    comments = null;
    success = null;
    constructor() {
        makeAutoObservable(this)
    }

    getByPost = async (id) => {
        try {
            await axios.get("http://localhost:3001/api/comments/" + id)
                .then(response => {
                    this.comments = response.data.comments
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }

    create = async (comment) => {
        try {
            await axios.post("http://localhost:3001/api/comments/", comment)
                .then(() => {
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 3000);
                })
                .catch(error => {
                    console.log(error.message)
                });
        } catch (error) {
            console.log(error);
        }
    }

    deleteComment = async (id) => {
        try {
            await axios.delete("http://localhost:3001/api/comments/" + id)
                .then(() => {
                    this.success = true;
                    this.comments = this.comments.filter(comment => comment._id !== id)
                    setTimeout(() => {
                        this.success = false;
                    }, 3000);
                })
                .catch(error => {
                    console.log(error.message)
                });
        } catch (error) {
            console.log(error);
        }
    }

}

const commentStore = new CommentStore()
export default commentStore;
export const commentContext = createContext(commentStore);
