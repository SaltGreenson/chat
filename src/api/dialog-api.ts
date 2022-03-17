import {instance} from "./api";
import {UserType} from "../redux/dialog-reducer";


export const dialogApi = {
    getAllUsers() {
        return instance.get(`/dialogs`).then(response => response.data)
    },
    startChatting(userId: number) {
        return instance.put<UserType>(`dialogs/${userId}`, {userId}).then(response => response.data)
    }
}