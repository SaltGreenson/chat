import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import React, {ChangeEvent, useState} from "react";
import ProfileDataFormReduxForm from "../ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../../types/types";
import ProfileData from "../ProfileDataForm/ProfileData";

const ProfileInfo: React.FC<PropsType>= ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData)
            .then(() => {setEditMode(false)})
            .catch((Exception) => {console.error(Exception)})

    }
    return (
        <div>
            <div className={styles.content__text}>
                <img
                    src={profile.photos.large || "https://th.bing.com/th/id/OIP.FcAdLyxhXrlNebug4ZU2iAHaI4?pid=ImgDet&rs=1"}
                    alt="Cannot load a photo" className={styles.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataFormReduxForm initialValues = {profile} profile={profile} onSubmit = {onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

            </div>
        </div>
    )
}

export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}: </b> {contactValue}
    </div>
}

export default ProfileInfo

// =====================================================================================================================

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (text: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (data: ProfileType) => Promise<any>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}