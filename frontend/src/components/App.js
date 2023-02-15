import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupAdd from './PopupAdd';
import PopupEdit from './PopupEdit';
import PopupUpdateAvatarForm from './PopupUpdateAvatarForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from "../utils/Auth";
import { Route, Switch, useHistory } from "react-router-dom";

import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [isRegistered, setIsRegistered] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
    const [email, setEmail] = useState("");
    const history = useHistory();

    useEffect(() => {
        const jwt = localStorage.getItem("JWT_TOKEN");
        if (jwt) {
            auth
                .getToken(jwt)
                .then((res) => {
                    setEmail(res.user.email);
                    setLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    if (err.status === 400) {
                        console.log("400 — Токен не передан или передан не в том формате");
                    } else if (err.status === 401) {
                        console.log("401 — Переданный токен некорректен");
                    }
                });
        }
    }, [history]);

    useEffect(() => {
        if (loggedIn) {
            api.fetchGetCards()
                .then((cards) => {
                    setCards(cards.data);
                })
                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                });
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            api.fetchGetMe()
                .then((user) => {
                    setCurrentUser(user.user);
                })
                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                });
        }
    }, [loggedIn]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpened(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(user) {
        api.fetchUpdateMe(user)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    function handleUpdateAvatar(avatar) {
        api.fetchUpdateAvatar(avatar)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    function handleAddPlaceSubmit(card) {
            api.fetchPostCards(card)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.fetchDeleteLikeCards(card._id).then((newCard) => {
                const newCads = cards.map((c) => c._id === card._id ? newCard.data : c);
                setCards([...newCads]);
            })
                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                });
        }

        else {
            api.fetchAddLikeCards(card._id).then((newCard) => {
                const newCads = cards.map((c) => c._id === card._id ? newCard.data : c);
                setCards([...newCads]);
            })
                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                });
        }

    }

    function handleCardDelete(card) {
        api.fetchDeleteCards(card._id)
            .then(() => {
                setCards(cards => cards.filter(c => c._id !== card._id));
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    };


    function handleRegister(data) {

        auth
            .register(data)
            .then(() => {
                setIsRegistered(true);
                setIsInfoTooltipOpened(true);
                history.push("/signin");
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - не передано одно из полей ");
                }
                //console.error(err);
                setIsRegistered(false);
                setIsInfoTooltipOpened(true);
                console.log(setIsInfoTooltipOpened(true));
            });
    }

    function handleLogin(data) {
        auth
            .login(data)
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    setEmail(data.email);
                    localStorage.setItem("JWT_TOKEN", res.token);
                    history.push("/");
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - не передано одно из полей");
                } else if (err.status === 401) {
                    console.log("401 - пользователь c email не найден ");
                }

                setIsRegistered(false);
                setIsInfoTooltipOpened(true);
            });
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("JWT_TOKEN");
        history.push("/signin");
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Header userEmail={email} onSignOut={handleSignOut} />
            <Switch>

                <ProtectedRoute
                    exact
                    path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                >
                </ProtectedRoute>

                <Route path="/signup">
                    <Register onRegister={handleRegister} />
                </Route>

                <Route path="/signin">
                    <Login onLogin={handleLogin} />
                </Route>

            </Switch>
            <Footer />

            <InfoTooltip
                isOpen={isInfoTooltipOpened}
                onClose={closeAllPopups}
                isOK={isRegistered}
            />

            <PopupAdd
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <PopupEdit
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <PopupUpdateAvatarForm
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />

        </CurrentUserContext.Provider>

    );
}

export default App;
