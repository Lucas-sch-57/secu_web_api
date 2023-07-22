import { useEffect, useState, useRef } from "react"
import { postContext } from "../stores/PostStore"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { userContext } from "../stores/UserStore"
import { useContext } from "react"
import { ThumbsDown, ThumbsUp } from "iconoir-react"
import jwt_decode from "jwt-decode"
import { CommentInput } from "../components/CommentInput"
import commentStore from "../stores/CommentStore"
import { toJS } from "mobx"
export const Posts = observer(() => {
    const postStore = useContext(postContext)
    const userStore = useContext(userContext)
    const [isMyPosts, setIsMyPosts] = useState(false)
    const userId = jwt_decode(userStore.user).id
    const isAdmin = userStore.isAdmin
    const title = useRef(null)
    const content = useRef(null)
    const [deletePostId, setDeletePostId] = useState(null)
    const contentRegex = new RegExp("^(?=.{6,})")
    const [isContentValid, setIsContentValid] = useState(false)

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

    const handleDeletePost = () => {
        postStore.deletePost(deletePostId)
        window.delete_post_modal.close()
        setDeletePostId(null)
    }

    const handleModalValidForm = () => {
        const post = {
            title: title.current.value,
            content: content.current.value
        }
        //Verifie si le contenu est valide
        if (!isContentValid)
            return
        postStore.createPost(post)
        window.create_post_modal.close()
    }

    const hanldeDeleteModalOpen = (postId) => {
        setDeletePostId(postId)
        window.delete_post_modal.showModal()
    }

    const isValidContent = () => {
        return contentRegex.test(content.current.value)
    }

    const handleContentChange = () => {
        setIsContentValid(isValidContent())
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
                <button className={`btn btn-sm btn-outline btn-info w-fit`} onClick={() => window.create_post_modal.showModal()}>Créer un post</button>
                <dialog id="create_post_modal" className="modal modal-bottom sm:modal-middle">
                    <form method="dialog" className="modal-box">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Titre</span>
                            </label>
                            <input type="text" placeholder="Titre" className="input input-bordered" ref={title} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contenu</span>
                            </label>
                            <textarea placeholder="Contenu" className="textarea h-24 textarea-bordered" ref={content} onChange={() => { handleContentChange() }}></textarea>
                            {!isContentValid && (
                                <label className="label">
                                    <span className="label-text-alt text-error">Le contenu doit contenir au moins 6 caractères</span>
                                </label>
                            )}
                        </div>
                        <div className="form-control mt-5">
                            <button className='btn btn-xs btn-success' onClick={() => handleModalValidForm()} disabled={!isContentValid} >Enregistrer</button>
                        </div>
                        <div className="modal-action">
                            <button className="btn">Fermer</button>
                        </div>
                    </form>
                </dialog>
            </div>
            <div className="flex flex-col justify-center gap-5">
                {postStore.posts && postStore.posts.map((post) => (
                    <div className="card w-full bg-base-100 shadow-xl" key={post._id}>
                        <div className="card-body gap-5 relative">
                            <h2 className="card-title">
                                {post.title}
                                {post.user === userId && (
                                    <div className="badge badge-secondary">ME</div>
                                )}
                            </h2>
                            <p>{post.content}</p>
                            <div>
                                {post.user != userId && (
                                    < div className="flex gap-5">
                                        {console.log(toJS(post.user))}

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
                                {(isAdmin || userId == post.user) && (
                                    <>
                                        <button className="btn btn-xs btn-error" onClick={() => hanldeDeleteModalOpen(post._id)}> Supprimer</button>
                                    </>
                                )}
                            </div>
                            <CommentInput postId={post._id} />
                        </div>
                    </div>
                ))}
                <dialog id="delete_post_modal" className="modal">
                    <form method="dialog" className="modal-box">
                        <p className="py-4">Êtes-vous sûr de vouloir supprimer votre post ?</p>
                        <div className="modal-action">
                            <button className="btn btn-md btn-outline btn-error" onClick={() => window.delete_post_modal.close()}>Non</button>
                            <button className="btn btn-md btn-success btn-outline" onClick={() => handleDeletePost()}>Oui</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div >
    )
})
