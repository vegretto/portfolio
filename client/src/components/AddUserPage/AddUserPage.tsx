import React from "react";
import useHttp from "../../hooks/useHttp.hook";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "../AddWorkPage/add-work-page.module.css";

type FormValues = {
    email: string
    password: string
}

const AddUserPage = () => {
    const {request} = useHttp()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSendForm:SubmitHandler<FormValues> = async (data) => {
        const response = await request('/api/auth/register', 'POST', data, {'Content-Type': 'application/json'})
    }

    return (
        <div>
            <h2 className='h2'>Добавить пользователя</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSendForm)}>
                <label> Почта
                    <input {...register('email', { required: false })} />
                </label>
                <label> Пароль
                    <input type={'password'} {...register('password', { required: false })} />
                </label>

                <input type="submit" />
            </form>
        </div>
    )
}

export default AddUserPage