import styles from "../AddWorkPage/add-work-page.module.css";
import React, {useContext, useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp.hook";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {AuthContext, SetCurrentUser, SetModal} from "../../App";

type FormValues = {
    email: string
    password: string
}

const LoginPage = ({setCurrentUser, setModal}: {setCurrentUser: SetCurrentUser, setModal:SetModal}) => {
    const {request, error} = useHttp()
    const navigate = useNavigate()
    const currentUser = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        if (error) {
            setModal({isVisible: true, isError: !!error, message: error})
        }
    }, [error])

    const onSendForm:SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await request('/api/auth/login', 'POST', data, {'Content-Type': 'application/json'})
            localStorage.setItem('token', response.accessToken)
            setCurrentUser({...currentUser, isAuthorized: true})
            navigate('/admin')
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div>
            <h2 className='h2'>Войти в админ-панель</h2>
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

export default LoginPage