import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {GenericThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profileAPI";

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS_PROFILE = "SET_STATUS_PROFILE"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const ADD_POST = "ADD_POST"
// const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"


const initialState = {
    posts: [
        {id: 3, text: "1"},
        {id: 1, text: "2"},
        {id: 2, text: "3"},
        {id: 4, text: "4"},
        {id: 5, text: "5"},
        {id: 7, text: "6"},
        {id: 8, text: "7"},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 6,
                text: action.newPostElement
            }
            return {
                ...state,
                posts: [...state.posts, newPost],

            }
        }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.text
        //     }
        // }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS_PROFILE: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            break
    }
    return state
}

export const actions = {
    deletePost: (postId: number) => ({
        type: DELETE_POST,
        postId
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: SET_USER_PROFILE,
        profile
    } as const),
    setStatusProfile: (status: string) => ({
        type: SET_STATUS_PROFILE,
        status
    } as const),
    addPostActionCreator: (newPostElement: string) => ({
            type: ADD_POST,
            newPostElement
        } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
            type: SAVE_PHOTO_SUCCESS,
            photos
        } as const),
}



export const getUserProfile = (userid: number): GenericThunkType<ActionsTypes> => {
    return async (dispatch) => {
        const response = await profileAPI.getProfile(userid)
        dispatch(actions.setUserProfile(response))
    }
}

export const getStatus = (userid: number): GenericThunkType<ActionsTypes> =>
    (dispatch) => {
        return profileAPI.getStatus(userid)
            .then(response => {
                dispatch(actions.setStatusProfile(response))
            })
    }

export const updateStatus = (status: string): GenericThunkType<ActionsTypes> =>
    (dispatch) => {
        return profileAPI.updateStatus(status)
            .then(response => {
                if (!response.resultCode) {
                    dispatch(actions.setStatusProfile(status))
                }
            })
    }

export const saveProfile = (profile: ProfileType): GenericThunkType<ActionsTypes | FormAction> =>
    async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.id
    if (response.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.messages[0]}))
        return Promise.reject(response.messages[0])
    }
}

export const savePhoto = (file: File): GenericThunkType<ActionsTypes> =>
    async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    debugger
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos))
    }
}

export default profileReducer

// =====================================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState