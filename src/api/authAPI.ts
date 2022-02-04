import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

type LogoutResponseType = {
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
    data: null
}

//

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha = "") {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeForCaptcha & ResultCodesEnum>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login').then(res => res.data)
    }
}