import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function PopupEdit({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (<PopupWithForm name="edit" title="Редактировать профиль" submit="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>

        <label className="popup__field-input">
            <input className="popup__input" type="text" id="name" name="name" value={name || ''} placeholder="Имя"
                required minLength="2" maxLength="40" onChange={handleNameChange} />
            <span className="popup__input-error" id="error-name"></span>
        </label>

        <label className="popup__field-input">
            <input className="popup__input" type="text" id="description" name="description"
                value={description || ''} placeholder="О себе" required minLength="2" maxLength="200" onChange={handleDescriptionChange} />
            <span className="popup__input-error" id="error-description"></span>
        </label>

    </PopupWithForm>)
}

export default PopupEdit;