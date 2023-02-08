import React from "react";
import rejectImg from "../images/RejectImg.svg";
import successImg from "../images/SuccessImg.svg";

function InfoTooltip({ isOpen, onClose, isOK }) {
    return (
        <div className={(isOpen ? "popup popup_opened" : "popup")}>
            <div className="popup__container">

                <button className="popup__close" type="button" onClick={onClose}></button>

                <img
                    src={isOK ? successImg : rejectImg}
                    alt={
                        isOK
                            ? "Вы успешно зарегистрировались!"
                            : "Что-то пошло не так. Попробуйте еще раз!"
                    }
                    className="popup__tooltip-image"
                />
                <p className="popup__tooltip-info">
                    {isOK
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так. Попробуйте еще раз!"}
                </p>

                {/* <img
                    src={`${successImg}`}
                    className="popup__tooltip-image"
                    alt="Успешная регистрация"
                />
                <p className="popup__tooltip-info">Вы успешно зарегистрировались!</p>

                
                <img
                    src={`${rejectImg}`}
                    className="popup__tooltip-image"
                    alt="Успешная регистрация"
                />
                <p className="popup__tooltip-info"> Что-то пошло не так. Попробуйте еще раз!</p> */}

            </div>
        </div>)
}

export default InfoTooltip;