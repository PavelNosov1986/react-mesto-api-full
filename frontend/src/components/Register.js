import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({ email, password });
    }

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    return (

        <div className="auth">
            <form className="popup__form" onSubmit={handleSubmit}>

                <h2 className="popup__title popup__title_auth">Регистрация</h2>

                <input
                    className="popup__input popup__input_auth"
                    onChange={handleEmail}
                    value={email}
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
                    onChange={handlePassword}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="30"
                    title="Придумайте и введите пароль"
                    required
                />
                <span className="popup__input-error"></span>

                <button className="popup__save popup__save_auth">Зарегистрироваться</button>

                <Link to="/signin" className="auth__signup-link">Уже зарегистрированы? Войти</Link>
            </form>
        </div>

    );
}

export default Register;