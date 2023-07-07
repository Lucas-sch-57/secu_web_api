import { SendDiagonal } from "iconoir-react"
import { useRef, useState } from "react"
import { commentContext } from "../stores/CommentStore"
import { useContext } from "react"
export const CommentInput = ({ postId }) => {
    const commentStore = useContext(commentContext)
    const commentInput = useRef(null)
    const [isCommentButtonDisabled, setIsCommentButtonDisabled] = useState(true)

    const handleInputChange = () => {
        console.log(commentInput.current.value.length)
        if (commentInput.current.value.length < 6) {
            setIsCommentButtonDisabled(true)
        } else {
            setIsCommentButtonDisabled(false)
        }
    }
    const sendComment = () => {
        if (!isCommentButtonDisabled) {
            const content = commentInput.current.value
            const comment = {
                content,
                post: postId
            }
            commentStore.create(comment)
            commentInput.current.value = ""
        }
    }
    return (
        <>
            <div className="flex flex-col">
                <div className={`flex`}>
                    <input type="text" placeholder="Ecrivez-ici ..." className="input input-bordered input-primary w-full rounded-none" ref={commentInput} onChange={() => handleInputChange()} />
                    <button className="btn btn-primary rounded-none" onClick={() => sendComment()} disabled={isCommentButtonDisabled} >
                        <SendDiagonal />
                        Envoyer
                    </button>
                </div>
            </div>
        </>

    )
}
