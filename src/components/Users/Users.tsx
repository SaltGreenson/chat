import React, {useEffect} from "react";
import Paginator from "../Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UserSearchForm";
import {FilterType, follow, requestsUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersSelector
} from "../../selectors/users-selectors";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
import {collectUsers, startCommunicate} from "../../redux/dialog-reducer";
import {getDialogUsersSelector} from "../../selectors/dialog-selector";
import Preloader from "../common/Preloader/Preloader";


type QueryType = { term?: string, page?: string, friend?: string };
export const Users: React.FC = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsersSelector)
    const dialogUsers = useSelector(getDialogUsersSelector)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        const query: QueryType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as  QueryType // getting field of query

        let actualPage = currentPage
        let actualFilter = filter
        if (parsed.page) {
            actualPage = +parsed.page
        }
        if (!!parsed.term) {
            actualFilter = {...actualFilter, term: parsed.term as string}
        }

        if (!!parsed.friend) {
            actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false}
        }

        dispatch(requestsUsers(actualPage, pageSize, actualFilter))
        dispatch(collectUsers())
    }, [])

    if (!dialogUsers || !users) {
        return <Preloader/>
    }

    const startChatting = (userId: number) => {
        if (!dialogUsers.some(user => user.id === userId)) {
            dispatch(startCommunicate(userId))
        } else {
            alert("Вы уже общаетесь с этим пользователем")
        }
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestsUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestsUsers(1, pageSize, filter))
    }

    const UsersFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const UsersUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return (
        <div>
            <UserSearchForm onFilterChanged={onFilterChanged}/>
            {users.map((u) => <User user={u}
                                    key={u.id}
                                    followingInProgress={followingInProgress}
                                    unfollow={UsersUnfollow}
                                    follow={UsersFollow}
                                    startChatting = {startChatting}
            />)}
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize} portionSize={5}/>
        </div>
    )
}

