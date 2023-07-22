import { useContext, useRef, useState } from "react"
import { userContext } from "../stores/UserStore"
import { observer } from "mobx-react-lite"
import jwt_decode from "jwt-decode"
export const Profile = observer(() => {
    const userStore = useContext(userContext)
    const userName = jwt_decode(userStore.user).username

    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)
    const emailRegEx = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const checkIsEmailValid = (email) => {
        if (emailRegEx.test(email)) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    const handleUserFormSubmit = (e) => {
        e.preventDefault();
        checkIsEmailValid(email.current.value)
        if (isEmailValid) {
            userStore.changeUsername(email.current.value)
        }
    }

    const handleUsernameFieldChange = () => {
        if (emailRegEx.test(email.current.value)) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    const checkIsPasswordValid = (password) => {
        if (passwordRegEx.test(password)) {
            setIsPasswordValid(true)
        } else {
            setIsPasswordValid(false)
        }
    }

    const checkIsPasswordConfirmed = (password, confirmPassword) => {
        if (password === confirmPassword) {
            return true
        } else {
            return false
        }
    }

    const handlePasswordFormSubmit = (e) => {
        e.preventDefault();
        checkIsPasswordValid(password.current.value)
        if (isPasswordValid) {
            if (checkIsPasswordConfirmed(password.current.value, confirmPassword.current.value)) {
                userStore.changePassword(password.current.value)
            } else {
                setIsPasswordConfirmed(false)
            }
        }
    }



    return (
        <div className="p-10">
            <h1 className="text-3xl mb-5">Profil</h1>
            <h2 className="text-secondary text-2xl">Bienvenu sur votre espace , <span className="text-primary">{userName} </span></h2>
            <div className="flex justify-between items-center">
                <form onSubmit={(e) => handleUserFormSubmit(e)} className="flex flex-col gap-5">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Username</label>
                        <input type="text" defaultValue={userName} className="input input-bordered w-full max-w-xs" onChange={() => handleUsernameFieldChange()} ref={email} />
                        {!isEmailValid && (
                            <label className="label text-error">
                                <span className="label-text-alt text-error">L&apos;adresse mail n&apos; est pas valide</span>
                            </label>
                        )}
                    </div>
                    <button type="submit" className="btn btn-info w-fit">Sauvegarder</button>
                </form>
                <div>
                    <button className="btn btn-warning" onClick={() => window.my_modal_1.showModal()}>Changer de mot de passe</button>
                    <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">Changement de mot de passe</h3>
                            <div className="form-control">
                                <label className="label">Nouveau mot de passe</label>
                                <input type="password" ref={password} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">Confirmer le mot de passe</label>
                                <input type="password" ref={confirmPassword} className="input input-bordered" />
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-outline btn-error btn-md">Annuler</button>
                                <button className="btn btn-outline btn-warning btn-md" onClick={(e) => handlePasswordFormSubmit(e)}>Confirmer le changement</button>
                            </div>
                            {!isPasswordValid && (
                                <label className="label text-error">
                                    <span className="label-text-alt text-error">Mot de passe invalide</span>
                                </label>
                            )}
                            {!isPasswordConfirmed && (
                                <label className="label text-error">
                                    <span className="label-text-alt text-error">Les mots de passe ne correspondent pas</span>
                                </label>
                            )}
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    )
})
