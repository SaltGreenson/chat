import React from "react";
import classes from "./Users.module.css"
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


const User: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div key={props.user.id} className={classes.userInfo}>
                <span>
                    <div className={classes.followBtn}>
                        <NavLink to={'/profile/' + props.user.id}>
                            <img
                                src={props.user.photos.small != null ? props.user.photos.small : "https://i.ya-webdesign.com/images/male-head-silhouette-png-2.png"}
                                alt="#" width="50px"/>
                        </NavLink>
                    </div>
                    <div>
                        {props.user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                      onClick={() => {
                                          props.unfollow(props.user.id)
                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                      onClick={() => {
                                          props.follow(props.user.id)
                                      }}>Follow</button>
                        }
                    </div>
                </span>
                <div className={classes.generalInformation}>
                    <span className={classes.name}>
                        <div>{props.user.name}</div>
                    </span>
                    <span className={classes.info}>
                        <div>{props.user.status}</div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default User

// =====================================================================================================================

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}