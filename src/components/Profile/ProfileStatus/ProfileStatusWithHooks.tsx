import React, {ChangeEvent, useEffect, useState} from "react";
import classes from "./ProfileStatus.module.css"

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            { !editMode &&
            <div className={classes.status__span}>
                <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
            </div>
            }
            { editMode &&
            <div className={classes.status__input}>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value = {status}/>
            </div>
            }
        </>
    )
}

export default ProfileStatusWithHooks

// =====================================================================================================================

type PropsType = {
    status: string
    updateStatus: (text: string) => void
}









