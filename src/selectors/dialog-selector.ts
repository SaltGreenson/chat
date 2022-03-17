import {AppStateType} from "../redux/redux-store";
import {UserType} from "../redux/dialog-reducer";

export const getDialogUsersSelector = (state: AppStateType):Array<UserType> => state.dialogPage.users
export const getAlreadyCommunicatedUsers = (state: AppStateType):Array<number> => state.dialogPage.alreadyCommunicatedUsers
export const getCurrentUser = (state: AppStateType): UserType => state.dialogPage.currentUser
export const getIsLoaded = (state: AppStateType): Boolean => state.dialogPage.isPageLoaded