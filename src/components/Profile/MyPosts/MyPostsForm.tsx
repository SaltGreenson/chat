import {createField, GetStringKeys, TextArea} from "../../common/FormsControls/FormsControls";
import React from "react";
import {required} from "../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";

const MyPostsForm: React.FC<InjectedFormProps<ValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<ValuesKeys>("Post message", "newPostText", TextArea, [required])}
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<ValuesType, PropsType>({form: 'posts'})(MyPostsForm)

// =====================================================================================================================

export type ValuesType = {
    newPostText: string
}
type PropsType = {}
type ValuesKeys = GetStringKeys<ValuesType>