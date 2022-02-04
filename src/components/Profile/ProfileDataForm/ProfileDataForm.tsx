import React from "react";
import {createField, GetStringKeys, Input, TextArea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import classes from "../../common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../../types/types";

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType> = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        { error && <div className={classes.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name:</b> {createField<ProfileTypeKeys>("Full name", "fullName", Input, [])}
        </div>
        <div>
            <b>Looking for a job:</b> {createField<ProfileTypeKeys>("Looking for a job", "lookingForAJob", Input, [], {type: "checkbox"})}
        </div>
        <div>
            <b> My professionals skills: </b> {createField<ProfileTypeKeys>("My professionals skills", "lookingForAJobDescription", TextArea, [])}
        </div>
        <div>
            <b>About me:</b> {createField<ProfileTypeKeys>("About me", "aboutMe", TextArea, [])}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            //    todo: create some solutions for embedded objects
            return <div key = {key}> <b>{key}: </b> {createField(key, "contacts." + key, Input, [])}</div>
        })}
        </div>

    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm

// =====================================================================================================================

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>