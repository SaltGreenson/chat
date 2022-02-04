import React from "react";
import ProfileStatus from "./ProfileStatus";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";

import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../types/types";
import {getUserProfile} from "../../../redux/profile-reducer";

class ProfileStatusContainer extends React.Component<PropsType & MapStatePropsType & RouteComponentProps<ParamsType>> {

    componentDidMount() {
        let userid: number = +this.props.match.params.userid
        if (!userid){
            userid = 2
        }
        this.props.getUserProfile(userid)
    }
    render() {

        return (
            <div>
                <ProfileStatus {...this.props} profile = {this.props.profile} status = {this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile
})



export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    //withAuthRedirect

)(ProfileStatusContainer)

// =====================================================================================================================

type PropsType = {
    getUserProfile: (userId: number) => void
    status: string
    updateStatus: (status: string) => void
}

type MapStatePropsType = {
    profile: ProfileType
}

type ParamsType = {
    userid: string
}

