import { useEffect, useState } from "react"
import { postContext } from "../stores/PostStore"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { userContext } from "../stores/UserStore"
import { useContext } from "react"
import { ThumbsDown, ThumbsUp } from "iconoir-react"
import jwt_decode from "jwt-decode"
import { CommentInput } from "../components/CommentInput"
import commentStore from "../stores/CommentStore"
export const Posts = observer(() => {
    const postStore = useContext(postContext)
    const userStore = useContext(userContext)
    const [isMyPosts, setIsMyPosts] = useState(false)
    const userId = jwt_decode(userStore.user).id
    const isAdmin = userStore.isAdmin


    useEffect(() => {
        if (!isMyPosts) {
            postStore.fetchPosts()
        }
    }, [postStore, isMyPosts])

    const handleMyPosts = () => {
        setIsMyPosts(true);
        postStore.fetchMyPosts()
    }

    const handleLike = (id) => {
        postStore.likePost(id)
    }

    const isLiked = (post) => {
        return post.likes.includes(userId);
    }

    return (
        <div className="px-44 py-10 flex flex-col gap-10">
            {commentStore.success && (
                <div className="alert alert-success">
                    Commentaire ajouté avec succès
                </div>
            )}
            <h1 className="text-5xl">Posts</h1>
            <div className="flex gap-5">
                {userStore.isLoggedIn && (
                    <button className={`btn btn-sm ${!isMyPosts ? 'btn-outline' : ''} btn-info w-fit`} onClick={() => handleMyPosts()}>Mes posts</button>
                )}
                <button className={`btn btn-sm ${isMyPosts ? 'btn-outline' : ''} btn-info w-fit`} onClick={() => setIsMyPosts(false)}>Tous les posts</button>
            </div>
            <div className="flex flex-col justify-center gap-5">
                {postStore.posts && postStore.posts.map((post) => (
                    <div className="card w-full bg-base-100 shadow-xl" key={post._id}>
                        <div className="card-body gap-5 relative">
                            <h2 className="card-title">
                                {post.title}
                                {post.user._id === userId && (
                                    <div className="badge badge-secondary">ME</div>
                                )}
                            </h2>
                            <p>{post.content}</p>
                            <div>
                                {post.user._id !== userId && (
                                    <div className="flex gap-5">
                                        <button className={`btn btn-xs ${!isLiked(post) && 'btn-outline '} btn-success transition-all`} onClick={() => handleLike(post._id)}>
                                            <ThumbsUp />
                                            J&apos;aime
                                        </button>
                                        <button className="btn btn-xs btn-outline btn-error">
                                            <ThumbsDown />
                                            Je n&apos; aime pas
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="card-actions">
                                <Link to={`/post/${post._id}`} className="link link-secondary">
                                    Voir
                                </Link>
                                {isAdmin && (
                                    <a className="link link-error">Supprimer</a>
                                )}
                            </div>
                            <CommentInput postId={post._id} />
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
})
