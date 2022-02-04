import React from "react";
import classes from "./MyPosts.module.css";
import Post from './Post/Post'
import MyPostsForm from "./MyPostsForm";
import {PostType} from "../../../types/types";


const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const addPost = (values: any) => {
        props.addPost(values.newPostElement)
    }

    const posts = [...props.posts].map(el => <Post key = {el.id} id={el.id} message={el.text}/>)
    return (
        <div className={classes.posts}>
            <div className={classes.newPost}>
                {posts}
            </div>
            <MyPostsForm onSubmit = {addPost}/>
        </div>
    )
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo

// =====================================================================================================================

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (postElement: string) => void
}


