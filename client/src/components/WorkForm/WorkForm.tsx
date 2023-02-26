import React, {useEffect, useState} from 'react';
import useHttp from "../../hooks/useHttp.hook";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "../AddWorkPage/add-work-page.module.css";
import {SetModal} from "../../App";

type FormValues = {
    name: string,
    link: string,
    type: string,
    img: FileList | null,
};

const WorkForm = ({formValues, setModal, isUpdate}: {formValues?: FormValues, setModal:SetModal, isUpdate: boolean}) => {
    const {request, error} = useHttp()
    const [response, setResponse] = useState({message: ''})

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormValues>();

    useEffect(() => {
        if (formValues) {
            reset(formValues)
        }
    }, [reset, formValues])

    useEffect(() => {
        if (!isUpdate) {
            reset()
        }
    }, [isSubmitSuccessful])

    const onSendForm:SubmitHandler<FormValues> = async (data) => {
        if (!isUpdate) {
            const response = await request('/api/works/add-work', 'POST', data)
            setResponse({message: response})
        } else {
            const response = await request('/api/works/update-work', 'POST', data)
            setResponse({message: response})
        }
    }

    useEffect(() => {
        if (response.message) {
            setModal({isVisible: true, isError: false, message: response.message})
        } else if (error) {
            setModal({isVisible: true, isError: true, message: error})
        }
    }, [response, error])

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSendForm)}>
            <label> Название
                <input {...register('name', { required: true })} />
                {errors.name && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Ссылка
                <input {...register('link', { required: true })} />
                {errors.link && <span className={styles.error}>Заполните поле</span>}
            </label>

            <label> Тип
                <select {...register("type", { required: true })}>
                    <option value="sm">Маленькая</option>
                    <option value="lg">Большая</option>
                </select>
            </label>

            <label> Картинка
                <input type="file" {...register('img', { required: true })} />
                {errors.link && <span className={styles.error}>Загрузите картинку</span>}
            </label>

            <input type="submit" />
        </form>
    );
};

export default WorkForm;