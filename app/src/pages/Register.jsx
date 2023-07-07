import { useRef } from 'react';
export const Register = () => {
    const username = useRef(null);
    const password = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username.current.value,
                "password": password.current.value
            })
        }).then(response => response.json())
            .then(() => {
                window.location.href = '/login'
            })
    }

    return (
        <div className='py-5 px-5 bg-slate-100'>
            <div className="flex flex-col justify-center px-5 gap-5 h-screen w-1/2 mx-auto">
                <h1 className="text-4xl">Inscription</h1>
                <form className="flex flex-col gap-5 text-black">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="input input-bordered w-full" ref={username} placeholder='example@example.com' />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" className="input input-bordered" ref={password} placeholder='************' />
                    <button type="submit" className="btn btn-secondary text-white" onClick={(e) => handleSubmit(e)}>S&apos;inscrire</button>
                </form>
            </div>
        </div>
    )
}
