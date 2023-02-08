import PopupWithForm from "./PopupWithForm";

function PopupConfirmDelete(props) {
    return (<PopupWithForm name="confirmDelete" title="Вы уверены?" submit="Да">
    </PopupWithForm>)
}

export default PopupConfirmDelete;