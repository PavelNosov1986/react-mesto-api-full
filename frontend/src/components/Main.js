import React, { useContext } from 'react';
import Avatar from '../images/Avatar.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
   
    return (<>
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-info">
                    <div className="profile__container-img">
                        <img src={currentUser?.avatar ? currentUser?.avatar : Avatar}
                            alt="Аватар"
                            className="profile__avatar" />
                        <button className="profile__update-avatar" onClick={props.onEditAvatar} title="Загрузить новый аватар" type="button" ></button>
                    </div>

                    <div className="profile__info">
                        <div className="profile__name-edit-button">
                            <h1 className="profile__name">{currentUser?.name}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__about-me">{currentUser?.about}</p>
                    </div>

                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} title="Добавить новые карточки" type="button"></button>
            </section>

            {props.cards && props.cards.length > 0
                && <section className="cards">
                    {props.cards.map((card) => {
                        return <Card
                            onCardClick={props.onCardClick}
                            key={card._id}
                            card={card}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    })}
                </section>}

        </main>
    </>)
}

export default Main;