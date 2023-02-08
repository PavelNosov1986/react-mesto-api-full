import React from 'react';

function PopupWithForm(props) {
    return (<div className={(props.isOpen ? "popup popup_opened" : "popup")} id={props.name} >
        <div className="popup__container">
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                {props.children}
                <button className="popup__save" type="submit">{props.submit}</button>
            </form>
        </div>
    </div>
    )
}
export default PopupWithForm;