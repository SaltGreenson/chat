import {InferActionsTypes} from "./redux-store";

const SEND_MESSAGE = "SEND_MESSAGE"
// const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY"



const initialState = {
    dialogs: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Good afternon'},
        {id: 4, message: 'Glad to see you'},
        {id: 5, message: 'Im ok'}
    ] as Array<DialogType>,
    messages: [
        {id: 6, name: 'Vlad'},
        {id: 7, name: 'Danik'},
        {id: 8, name: 'Dima'},
        {id: 4, name: 'Ira'},
        {id: 5, name: 'Nikita'},
        {id: 3, name: 'Valera'},
        {id: 2, name: 'Sasha'},
        {id: 1, name: 'Sveta'},
        {id: 9, name: 'Nastya'}
    ] as Array<MessageType>
}



const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            const body = action.newMessageBody
            return {
                ...state,
                dialogs: [...state.dialogs, {id: 51231, message: body}]
            }
        }
        default:
            break
    }
    return state
}


export default dialogsReducer

// =====================================================================================================================

type DialogType = {
    id: number,
    message: string
}

type MessageType = {
    id: number,
    name: string
}

export type InitialStateType = typeof initialState

export const actions = {
    sendMessage: (newMessageBody: string) => (
        {type: SEND_MESSAGE, newMessageBody} as const)
}

type ActionsTypes = InferActionsTypes<typeof actions>