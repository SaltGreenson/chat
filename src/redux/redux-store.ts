import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import {chatReducer} from "./chat-reducer";
import {dialogReducer} from "./dialog-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer,
    dialogPage: dialogReducer
})

//type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends {[keys: string] : (...args: any[]) => infer U} ? U : never


type RootReducerType = typeof rootReducer
export  type AppStateType = ReturnType<RootReducerType> // определяет то, что возвращается из rootReducer и зафиксирует под названием AppStateType


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

export default store
export type GenericThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>