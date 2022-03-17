import React, {useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {setCurrentUserById} from "../../redux/dialog-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, getIsLoaded} from "../../selectors/dialog-selector";
import Preloader from "../../components/common/Preloader/Preloader";

const DialogUser: React.FC = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)
    const isLoaded = useSelector(getIsLoaded)
    useEffect(() => {
        let id: number | null = null
        id = +history.location.pathname.split('/')[2]
        dispatch(setCurrentUserById(id))
    }, [])
    useEffect(() => {
        console.log(isLoaded)
    }, [isLoaded])

    return <>
        {!isLoaded ? <Preloader/> :
            <div>
                <div style={{border: "solid black 2px", height: "80px", display: "flex"}}>
                    <img style={{height: "100%", marginRight: "50px", borderRadius: "50%"}}
                         src={user.photos?.small ? user.photos.small : "https://i.ya-webdesign.com/images/male-head-silhouette-png-2.png"}
                         alt=""/>
                    <div style={{marginRight: "350px"}}>
                        <h3>{user.userName}</h3>
                    </div>
                    <div>
                        <p>Последний раз был(а) в сети: {user.lastUserActivityDate}</p>
                    </div>
                </div>
            </div>
        }

    </>
}


export default DialogUser