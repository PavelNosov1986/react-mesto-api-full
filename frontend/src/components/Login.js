import React, { useState } from 'react';
import { Link } from "react-router-dom";


function Login({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }
    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!email || !password) {
            return;
        }
        onLogin({
            password: password,
            email: email,
        });
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <div className="auth">
                <form className="popup__form" onSubmit={handleSubmit}>

                    <h3 className="popup__title popup__title_auth">Вход</h3>

                    <input
                        className="popup__input popup__input_auth"
                        value={email}
                        onChange={handleEmail}
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        minLength="2"
                        maxLength="200"
                        title="Введите адрес электронной почты"
                        required
                    />
                    <span className="popup__input-error"></span>

                    <input
                        className="popup__input popup__input_auth"
                        value={password}
                        onChange={handlePassword}
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="30"
                        title="Введите пароль"
                        required
                    />
                    <span className="popup__input-error"></span>

                    <button className="popup__save popup__save_auth">Войти</button>

                    <Link to="/signup" className="auth__signup-link">
                        Нет учетной записи? Зарегистрироваться
                    </Link>
                </form>
            </div>
        </>
    );
}

export default Login;