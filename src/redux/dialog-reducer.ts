import {GenericThunkType, InferActionsTypes} from "./redux-store";
import {dialogApi} from "../api/dialog-api";
import {PhotosType} from "../types/types";
import User from "../components/Users/User";


export type UserType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}

const initialState = {
    users: [] as Array<UserType>,
    alreadyCommunicatedUsers: [] as Array<number>,
    currentUser: {} as UserType,
    isPageLoaded: false
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const dialogReducer = (state = initialState, action:ActionsTypes) => {
    switch (action.type) {
        case "SN/USERS-RECEIVED": {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case "SN/START-COMMUNICATE": {
            return {
                ...state,
                alreadyCommunicatedUsers: [...state.alreadyCommunicatedUsers, action.userId]
            }
        }
        case "SN/SET-CURRENT-USER": {
            return {
                ...state,
                currentUser: action.user
            }
        }
        case "SN/SET-IS-PAGE-LOADED" : {
            return {
                ...state,
                isPageLoaded: action.isLoaded
            }
        }
    }
    return state
}


const actions = {
    usersReceived: (users: Array<any>) => ({
        type: "SN/USERS-RECEIVED",
        users
    } as const),
    startCommunicate: (userId: number) => ({
        type: "SN/START-COMMUNICATE",
        userId
    } as const),
    setCurrentUser: (user: UserType) => ({
        type: "SN/SET-CURRENT-USER",
        user
    } as const),
    setIsPageLoaded: (isLoaded: boolean) => ({
        type: "SN/SET-IS-PAGE-LOADED",
        isLoaded
    } as const)
}

export const setCurrentUserById = (id: number): GenericThunkType<ActionsTypes> =>
    async (dispatch: any) => {
        dispatch(actions.setIsPageLoaded(false))
        const users: Array<UserType> = await dialogApi.getAllUsers()
        const user: UserType | undefined = users.find(user => user.id === id)
        dispatch(actions.setCurrentUser(user as UserType))
        dispatch(actions.setIsPageLoaded(true))
    }

export const collectUsers = (): GenericThunkType<ActionsTypes> =>
    async (dispatch) => {
        dispatch(actions.setIsPageLoaded(false))
        const response = await dialogApi.getAllUsers()
        dispatch(actions.usersReceived(response))
        dispatch(actions.setIsPageLoaded(true))
    }

export const startCommunicate = (userId: number): GenericThunkType<ActionsTypes> =>
    async (dispatch) => {
    dispatch(actions.setIsPageLoaded(false))
    const response = await dialogApi.startChatting(userId)
    console.log(response)
    dispatch(actions.startCommunicate(userId))
    dispatch(actions.setIsPageLoaded(true))
    }