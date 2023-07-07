import { useContext, useRef } from "react";
import { userContext } from "../stores/UserStore";
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const userStore = useContext(userContext)
    const username = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        userStore.login(username.current.value, password.current.value);

        if (!userStore.user) navigate('/');
    }


    return (
        <div className="flex flex-col justify-center items-center gap-5 h-screen">
            <h1 className="text-4xl">Connexion</h1>
            <form className="flex flex-col gap-5">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="input input-bordered input-primary w-full" ref={username} />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" className="input input-bordered input-primary" ref={password} />
                <button type="submit" className="btn btn-primary text-white" onClick={(e) => handleSubmit(e)}>Se connecter</button>
            </form>
        </div>
    )
}
