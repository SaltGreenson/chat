import React from "react";
import styles from "./FormsControls.module.css"
import {FieldValidatorType, required} from "../../utils/validators/validators";
// @ts-ignore
import {Field, WrappedFieldArrayProps, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

//type FormControlType = (params: FormControlPropsType) => React.ReactNode

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
    )
}


export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}> <input {...input} {...restProps}/> </FormControl>
    )
}



export function createField<FormKeysType extends string>(placeholder: string | undefined,
                            name: FormKeysType,
                            component: React.FC<WrappedFieldProps> | string,
                            validators: Array<FieldValidatorType> | null,
                            props = {},
                            text = "") {
    return (
        <div>
            <Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/> {text}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string >