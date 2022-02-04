import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../selectors/users-selectors";

const userSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}
const UserSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UserSearchForm

// =====================================================================================================================

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string
    friend: FriendFormType
}