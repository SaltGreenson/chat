import React from "react";
import classes from "./Post.module.css";


const Post: React.FC<PropsType> = (props) => {
    return(
        <div className={classes.item}>{props.message}</div>
    )
}
export default Post

// =====================================================================================================================

type PropsType = {
    message: string
    id: number
}