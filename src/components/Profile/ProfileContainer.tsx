import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuhRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userid: number | null = +this.props.match.params.userid
        if (!userid) {
            userid = this.props.autorizedUserId
            if (!userid) {
                // todo: replace push with Redirect
                this.props.history.push("/login")
            }
        }
        if (!userid) {
            throw new Error("ID should not be null in URI params or in state ('autorizedUserId')")
        } else {
            this.props.getUserProfile(userid)
            this.props.getStatus(userid)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (prevProps.match.params.userid !== this.props.match.params.userid) {
            this.refreshProfile()
        }

    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userid}
                         profile={this.props.profile as ProfileType}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

// =====================================================================================================================

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (text: string) => void
    savePhoto: (file: File) => void
    saveProfile: (data: ProfileType) => Promise<any>
}

type ParamsType = {
    userid: string
}


type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<ParamsType>;
