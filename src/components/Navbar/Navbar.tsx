import React from "react";
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import LogInIcon from "../../assets/nav/log-in-outline.svg"
import LogOutIcon from "../../assets/nav/log-out-outline.svg"
import UsersIcon from "../../assets/nav/people-outline.svg"
import MessagesIcon from "../../assets/nav/chatbox-outline.svg"
import ProfileIcon from "../../assets/nav/person-outline.svg"

export const Navbar: React.FC = () => {

    const isAuth:boolean = useSelector((state: AppStateType) => state.auth.isAuth)

    // @ts-ignore
    return(
        <div className={classes.navigation}>
            <ul>
                <li className={classes.list || classes.active}>
                    <a href="#">
                        <span className={classes.text}>Profile</span>
                        <span className={classes.icon}><img src={ProfileIcon} alt="#" height="25px"/></span>
                    </a>
                </li>
                <li className={classes.list}>
                    <a href="#">
                        <span className={classes.text}>Messages</span>
                        <span className={classes.icon}><img src={MessagesIcon} alt="#" height="25px"/></span>
                    </a>
                </li>
                <li className={classes.list}>
                    <a href="#">
                        <span className={classes.text}>Users</span>
                        <span className={classes.icon}><img src={UsersIcon} alt="#" height="25px"/></span>
                    </a>
                </li>
                <li className={classes.list}>
                    <a href="#">
                        {isAuth
                            ? <>
                                <span className={classes.text}>Log out</span>
                                <span className={classes.icon}><img src={LogOutIcon} alt="#" height="25px"/></span>
                            </>
                            : <>
                                <span className={classes.text}>Log in</span>
                                <span className={classes.icon}><img src={LogInIcon} alt="#" height="25px"/></span>
                            </>

                        }

                    </a>
                </li>
                <div className={classes.indicator}>

                </div>
            </ul>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </div>
    )
}



// const Navbar: React.FC = () => {
//     return(
//         <nav className={classes.nav}>
//             <div className={classes.item}>
//                 <NavLink to="/profile" className={classes.profile} activeClassName = {classes.activeLink}>Profile</NavLink>
//             </div>
//             <div className={classes.item}>
//                 <NavLink to="/dialogs" activeClassName = {classes.activeLink} >Messages</NavLink>
//             </div>
//             <div className={classes.item} >
//                 <NavLink to="/users" activeClassName = {classes.activeLink} >Users</NavLink>
//             </div>
//             <div className={classes.item}>
//                 <NavLink to="/news" activeClassName = {classes.activeLink}>News</NavLink>
//             </div>
//             <div className={classes.item}>
//                 <NavLink to="/music" activeClassName = {classes.activeLink}>Music</NavLink>
//             </div>
//             <div className={classes.item} >
//                 <NavLink to="/settings" activeClassName = {classes.activeLink} >Settings</NavLink>
//             </div>
//
//         </nav>
//     )
// }
// export default Navbar