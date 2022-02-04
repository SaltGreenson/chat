import React from "react";
import classes from "./Dialog.module.css"
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextArea} from "../common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";
import Message from "./Message";
import DialogItem from "./DialogItem";

const Dialogs: React.FC<PropsType> = (props) => {
    const state = props.dialogsPage
    const dialogElements = state.messages.map(el => <DialogItem name={el.name} key = {el.id} id={el.id}/>)
    const messages = state.dialogs.map(el =>  <Message message={el.message} key = {el.id}/>)

    const addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody)
    }
    return (
        <div className={classes.dialog}>
            <div className={classes.dialogsItems}>
                {dialogElements}
            </div>
            <div className={classes.messages}>
                <div>{messages}</div>
                <AddMessageReduxForm onSubmit = {addNewMessage}/>
            </div>
        </div>
    )
}


const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsTypeOfAddMessageForm> & PropsTypeOfAddMessageForm> = (props) => {
    // const maxLength200 = maxLengthCreator(200)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", TextArea, [required])}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<NewMessageFormType, PropsTypeOfAddMessageForm>({form: 'dialogMessageForm'})(AddMessageForm)
export default Dialogs

// =====================================================================================================================

type NewMessageFormType = {
    newMessageBody: string
}
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsTypeOfAddMessageForm = {}

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
