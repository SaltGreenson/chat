import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {collectUsers, UserType} from "../../redux/dialog-reducer";
import {getDialogUsersSelector, getIsLoaded} from "../../selectors/dialog-selector";
import Preloader from "../../components/common/Preloader/Preloader";
import {NavLink} from 'react-router-dom';

const DialogsPage: React.FC = (props) => {
    const dispatch = useDispatch()
    const isLoaded = useSelector(getIsLoaded)
    useEffect(() => {
        dispatch(collectUsers())
    }, [])
    if (!isLoaded) {
        return <Preloader/>
    }
    return <div>
        <Dialog/>
    </div>
}
const Dialog: React.FC = (props) => {
    const users = useSelector(getDialogUsersSelector)

    if(!users) {
        return <Preloader/>
    }
    return <div style={{height:"500px", overflowY: "auto"}}>
        {users.length === 0 && <div><h2>У вас пока нет диалогов</h2></div> ||
            users.map(user => {
                return <User key={user.id} user={user}/>
            })
        }
    </div>
}

const User: React.FC<UserPropsType> = ({user}) => {

    return <div>
        <NavLink to={'/dialogs/' + user.id}>
            <div style={{display: "flex"}}>
                <img style={{height: "50px", marginRight: "50px", borderRadius: "50%"}} src={user.photos.small !== null? user.photos.small : "https://i.ya-webdesign.com/images/male-head-silhouette-png-2.png"} alt=""/>
                <div style={{marginRight: "350px"}}>
                    <h3>{user.userName}</h3>
                </div>
                {user.hasNewMessages
                    && <p style={{color: "red"}}>Новых сообщений: {user.newMessagesCount}</p>}
            </div>
        </NavLink>

        <hr/>
    </div>
}

type UserPropsType = {
    user: UserType
}

export default DialogsPage