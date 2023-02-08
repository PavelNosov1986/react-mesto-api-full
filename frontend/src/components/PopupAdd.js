import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupAdd({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: name,
            link: link
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (<PopupWithForm name="add-cards" title="Новое место" submit="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>

        <label className="popup__field-input">
            <input className="popup__input" type="text" id="title" name="title" placeholder="Название" minLength="2"
                maxLength="30" required value={name} onChange={evt => setName(evt.target.value)} />
            <span className="popup__input-error" id="error-title"></span>
        </label>

        <label className="popup__field-input">
            <input className="popup__input" type="url" id="link-image" name="linkImage"
                placeholder="Ссылка на картинку" required value={link} onChange={evt => setLink(evt.target.value)} />
            <span className="popup__input-error" id="error-link-image"></span>
        </label>

    </PopupWithForm>)
}

export default PopupAdd;