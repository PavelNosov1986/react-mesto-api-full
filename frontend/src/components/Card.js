import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id ? card.owner._id : card.owner === currentUser._id;

    //Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`element__delete ${isOwn ? 'element__delete-active' : 'element__delete-inactive'}`);

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    //Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : 'element__like-inactive'}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (<>
        <div className="element">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="elemments__like-counter">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="element__counter" id="counter">{card.likes?.length}</span>
                </div>
            </div>
        </div>
    </>
    )
}

export default Card