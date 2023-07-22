import { makeAutoObservable } from "mobx";
import axios from "axios";
import { createContext } from "react";
import { toJS } from "mobx";
class PostStore {
    posts = [];
    post = null;
    constructor() {
        makeAutoObservable(this);
    }

    fetchPosts = async () => {
        try {
            await axios.get("http://localhost:3001/api/posts/")
                .then(response => {
                    this.posts = response.data.posts
                })
                .catch(error => {
                    console.log(error)
                });

        } catch (error) {
            console.log(error);
        }
    }

    fetchMyPosts = async () => {
        try {
            await axios.get("http://localhost:3001/api/posts/my-posts")
                .then(response => {
                    this.posts = response.data.posts
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }
    onePost = async (id) => {
        try {
            await axios.get("http://localhost:3001/api/posts/" + id)
                .then(response => {
                    this.post = response.data.post
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }

    updatePost = async (post, id) => {
        try {
            await axios.patch("http://localhost:3001/api/posts/" + id, post)
                .then(response => {
                    this.post = response.data.post
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }

    likePost = async (id) => {
        try {
            await axios.patch("http://localhost:3001/api/posts/" + id + "/like")
                .then(response => {
                    const index = this.posts.findIndex(post => post._id === id)
                    this.posts[index] = response.data.post
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }

    createPost = async (post) => {
        try {
            await axios.post("http://localhost:3001/api/posts/", post)
                .then(response => {
                    this.posts.push(response.data.post)
                    console.log(toJS(this.posts))

                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }


    deletePost = async (id) => {
        try {
            await axios.delete("http://localhost:3001/api/posts/" + id)
                .then(() => {
                    this.posts = this.posts.filter(post => post._id !== id)
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error);
        }
    }
}
const postStore = new PostStore();
const postContext = createContext(new PostStore());
export { postStore, postContext }