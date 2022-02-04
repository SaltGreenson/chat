import {GetItemsType, instance, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 7, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    follow(userid: number) {
        return instance.post<APIResponseType>(`follow/${userid}`).then(res => res.data)
    },
    unfollow(userid: number) {
        return instance.delete(`follow/${userid}`).then(res => res.data) as Promise<APIResponseType>
    }
}