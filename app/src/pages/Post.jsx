import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { postContext } from '../stores/PostStore';
import { useContext } from 'react';
import { userContext } from '../stores/UserStore';
import { observer } from 'mobx-react';
import { EditPencil, Trash, ThumbsUp, ThumbsDown } from 'iconoir-react'
import { commentContext } from '../stores/CommentStore';
import { useRef } from 'react';
import { toJS } from 'mobx'
import jwt_decode from "jwt-decode";
export const Post = observer(() => {

    const { postId } = useParams();
    //Stores
    const postStore = useContext(postContext)
    const userStore = useContext(userContext)
    const commentStore = useContext(commentContext)
    const userId = jwt_decode(userStore.user).id
    const title = useRef(null)
    const content = useRef(null)

    useEffect(() => {
        postStore.onePost(postId)
        commentStore.getByPost(postId)
    }, [postId, postStore])

    const handleModalValidForm = (postId) => {
        const post = {
            title: title.current.value,
            content: content.current.value
        }
        postStore.updatePost(post, postId)
        window.my_modal_5.close()
    }

    const handleDeletePost = (postId) => {
        postStore.deletePost(postId)
    }


    return (
        <div className='p-5'>
            <>
                {postStore.post && (
                    <>
                        <div className='flex justify-between'>
                            <h1 className='text-3xl text-primary'>{postStore.post.title}</h1>
                            {postStore.post.user._id === userId && (
                                <div className='flex gap-5'>
                                    <button className='btn btn-xs btn-error' onClick={() => handleDeletePost(postStore.post._id)}>
                                        <Trash />
                                        Supprimer
                                    </button>
                                    <button className="btn btn-xs btn-warning" onClick={() => window.my_modal_5.showModal()}>
                                        <EditPencil />
                                        Modifier
                                    </button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <form method="dialog" className="modal-box">
                                            <h3 className="font-bold text-lg">Modification de l&apos;article: {postStore.post.title}</h3>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Titre</span>
                                                </label>
                                                <input type="text" placeholder="Titre" className="input input-bordered" defaultValue={postStore.post.title} ref={title} />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Contenu</span>
                                                </label>
                                                <textarea placeholder="Contenu" className="textarea h-24 textarea-bordered" defaultValue={postStore.post.content} ref={content}></textarea>
                                            </div>
                                            <div className="form-control mt-5">
                                                <button className='btn btn-xs btn-success' onClick={() => handleModalValidForm(postStore.post._id)}>Enregistrer</button>
                                            </div>
                                            <div className="modal-action">
                                                <button className="btn">Fermer</button>
                                            </div>
                                        </form>
                                    </dialog>
                                </div>
                            )}
                        </div>
                        <p>{postStore.post.content}</p>
                        <h2 className='text-2xl text-secondary'>Espace commentaires</h2>
                        <div className='mt-5 flex flex-col gap-5 max-h-[80vh] overflow-auto'>
                            {commentStore.comments && commentStore.comments.map((comment, index) => (
                                <div key={index} className='p-5 rounded-lg bg-slate-900'>
                                    {console.log(toJS(comment))}
                                    <div className='flex justify-between'>
                                        <h3 className='text-primary'>{comment.user.username}</h3>
                                        <div className='flex flex-col items-center gap-5'>
                                            {
                                                comment.user._id === userId && (
                                                    <button className='btn btn-xs btn-error' >
                                                        <Trash />
                                                        Supprimer
                                                    </button>
                                                )
                                            }
                                            {comment.user._id != userId && (
                                                <div className='flex gap-5'>
                                                    <button className='btn btn-xs btn-success'>
                                                        <ThumbsUp />
                                                    </button>
                                                    <button className='btn btn-xs btn-error'>
                                                        <ThumbsDown />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )
                }
            </>
        </div >
    )
})
