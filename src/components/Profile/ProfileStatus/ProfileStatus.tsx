import React, {ChangeEvent, Props} from "react";
import classes from "./ProfileStatus.module.css"
import {ProfileType} from "../../../types/types";



class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }
    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <>
                {!this.state.editMode &&
                    <div className={classes.status__span}>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div className={classes.status__input}>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus

// =====================================================================================================================

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    profile: ProfileType
}

type StateType = {
    editMode: boolean
    status: string
}








