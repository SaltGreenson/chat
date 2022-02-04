import React from "react"
import style from "./Dialog.module.css"
import {NavLink} from "react-router-dom"

const DialogItem: React.FC<PropsType> = (props) => {
    const path = "/dialogs" + props.id
    return <div className={style.dialog + ' ' + style.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}


export default DialogItem
// =====================================================================================================================

type PropsType = {
    name: string
    id: number
}