import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captcha: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                                handleSubmit,
                                                                                                                error,
                                                                                                                captcha
                                                                                                            }) => {
    return (

        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypesKeys>("Email", "email", Input, [required])}
            {createField<LoginFormValuesTypesKeys>("Password", "password", Input, [required], {type: "password"})}
            {createField<LoginFormValuesTypesKeys>(undefined, "rememberMe", Input, null, {type: "checkbox"}, "remember me")}
            {error && <div className={classes.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
                {captcha && <img src={captcha} alt = "cannot upload captcha"/>}
                {captcha && createField<LoginFormValuesTypesKeys>("Captcha", "captcha", Input, [required])}
            </div>
        </form>
    )
}
// <FormData, Props>
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

export const Login: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={captchaUrl}/>
    </div>
}

// =====================================================================================================================

export type LoginFormValuesType = {
    captcha: string;
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormValuesTypesKeys = GetStringKeys<LoginFormValuesType>