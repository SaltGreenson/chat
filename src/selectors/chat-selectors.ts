import {AppStateType} from "../redux/redux-store";
// селектор для получения статуса
export const getStatus = (state: AppStateType) => state.chat.status
// селектор для получения сообщения
export const getMessage = (state: AppStateType) => state.chat.messages