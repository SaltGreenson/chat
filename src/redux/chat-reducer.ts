import {GenericThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid'

// создаем тип для сообщений
type ChatMessageType = ChatMessageAPIType & {id: string}


// тип для действий
type ActionsType = InferActionsTypes<typeof actions>
// тип для стейта
type InitialStateType = typeof initialState


// стейт который инизиализируется дефолтными значениями
const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

// стейт
export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    // свитч по типам действий
    switch (action.type) {
        case "SN/MESSAGES_RECEIVED": {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        }
        case "SN/STATUS_CHANGED": {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            break
    }

    return state
}

// объект содержащий в себе действия
const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: "SN/MESSAGES_RECEIVED", payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: "SN/STATUS_CHANGED", payload: {status}
    } as const)
}

// буферная фукнция для замыкания
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
// санка для обработки сообщения
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
// буферная функция для замыкания
let _statusChangedHandler: ((status: StatusType) => void) | null = null
// санка для изменения статуса
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

// санка для получения сообщений с сервера
export const startMessagesListening = (): GenericThunkType<ActionsType> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
// санка для остановки прослушивания сообщений
export const stopMessagesListening = (): GenericThunkType<ActionsType> => async (dispatch) => {
    chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
// санка для отправки сообщения
export const sendMessage = (message: string): GenericThunkType<ActionsType> => async (dispatch) => {
    chatAPI.sendMessage(message)
}
