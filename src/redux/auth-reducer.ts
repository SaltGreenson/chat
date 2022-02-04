import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {GenericThunkType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL'


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            break
    }
    return state
}


export const getAuthUserData = (): GenericThunkType<ActionsTypes> => {
    return async (dispatch) => {
        const response = await authAPI.me()
        if (response.resultCode === ResultCodesEnum.Success) {
            const {id, email, login} = response.data
            dispatch(actions.setAuthUserData(id, email, login, true))
        }

    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): GenericThunkType<ActionsTypes | ReturnType<typeof stopSubmit>> =>
    async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }

}

export const getCaptchaUrl = (): GenericThunkType<ActionsTypes> =>
    async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captcha = response.url
    dispatch(actions.getCaptchaUrlSuccess(captcha))
}

export const logout = (): GenericThunkType<ActionsTypes> =>
    async (dispatch) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

// =====================================================================================================================

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

export const actions = {
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const),
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_AUTH_USER_DATA,
        payload: {
            id,
            email,
            login,
            isAuth
        }
    } as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>