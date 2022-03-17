import {updateObjectInArray} from "../components/utils/object-helper";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes, GenericThunkType} from "./redux-store";
import {usersAPI} from "../api/usersAPI";
import {APIResponseType} from "../api/api";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS = "SET-TOTAL-USERS"
const SET_FETCHING = "SET_FETCHING"
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS"
const SET_FILTER = "SET_FILTER"

export const initialState = {
    users: [] as Array<UserType>,
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    filter: {
        term: "",
        friend: null as null | boolean
    },
    followingInProgress: [] as Array<number> // array of users ids
}

const usersReducer = (state = initialState, action: ActionsTypes ): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userid, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userid, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userid]
                    : state.followingInProgress.filter(id => id !== action.userid)
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default:
            break
    }
    return state
}


export const actions = {
    followSuccess: (userid: number) => ({
        type: FOLLOW,
        userid
    } as const),
    unfollowSuccess: (userid: number) => ({
        type: UNFOLLOW,
        userid
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    } as const),
    setTotalUsers: (totalUsersCount: number) => ({
        type: SET_TOTAL_USERS,
        count: totalUsersCount
    } as const),
    setFilter: (filter: FilterType) => ({
        type: SET_FILTER,
        payload: filter
    } as const),
    setFetching: (isFetching: boolean) => ({
        type: SET_FETCHING,
        isFetching
    } as const),
    toggleFollowingProgress: (fetching: boolean, userid: number) => ({
        type: TOGGLE_FOLLOWING_PROGRESS,
        followingInProgress: fetching,
        userid
    } as const)
}


// ThunkAction<возвращаемое значение, глобальный тип, экстра аргументы (пока не нужно), экшен тип>
export const requestsUsers = (currentPage: number, pageSize: number, filter: FilterType): GenericThunkType<ActionsTypes> => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
        const response = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

        dispatch(actions.setFetching(false))
        dispatch(actions.setTotalUsers(response.totalCount))
        dispatch(actions.setUsers(response.items))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userid: number, apiMethod: (userId: number) => Promise<APIResponseType >,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userid))
    const response = await apiMethod(userid)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userid))
    }
    dispatch(actions.toggleFollowingProgress(false, userid))
}


export const unfollow = (userid: number): GenericThunkType<ActionsTypes> => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userid, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export const follow = (userid: number): GenericThunkType<ActionsTypes> => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userid, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}


export default usersReducer

//======================================================================================================================

export type InitialState = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

export type FilterType = typeof  initialState.filter