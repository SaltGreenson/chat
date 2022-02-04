import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseDataType = {
     photos: PhotosType
}

export const profileAPI = {
    getProfile(userid: number) {
        return instance.get<ProfileType>(`profile/${userid}`).then(res => res.data)
    },
    getStatus(userid: number) {
        return instance.get<string>(`profile/status/${userid}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType<ProfileType>>(`profile`, profile).then(res => res.data)
    }
}