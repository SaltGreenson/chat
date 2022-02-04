import React from "react";
import {Contact} from "../ProfileInfo/ProfileInfo";
import {ContactsType, ProfileType} from "../../../types/types";

const ProfileData: React.FC<PropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
        </div>
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professionals skills:</b> {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object
            .keys(profile.contacts)
            .filter(key => !!profile.contacts[key as keyof ContactsType])
            .map(key => {
                return <Contact key = {"contacts." + profile.contacts[key as keyof ContactsType]} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}
                />
        })}
        </div>

    </div>
}

export default ProfileData

// =====================================================================================================================

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}