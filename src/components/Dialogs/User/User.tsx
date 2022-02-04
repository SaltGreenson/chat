import classes from "./User.module.css"
import {BrowserRouter, Route} from "react-router-dom";
import {NavLink} from "react-router-dom";



const User: React.FC<PropsType > = (props) => {
    return (
        <BrowserRouter>
            <div className = {classes.name}>
                <div className={classes.name}>
                    <NavLink to={"/dialogs/" + props.id} activeClassName = {classes.active}>{props.name}</NavLink>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default User

// =====================================================================================================================

type PropsType = {
    id: number
    name: string
}