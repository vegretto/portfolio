import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import useHttp from "../../hooks/useHttp.hook";
import styles from "../AddWorkPage/add-work-page.module.css";
import {SetModal} from "../../App";

type FormValues = {
    name: string,
    link: string,
    type: string,
    img: FileList | null,
};


const AddWorkPage = ({setModal}: {setModal:SetModal}) => {
    const {request, error} = useHttp()
    const [response, setResponse] = useState({message: ''})

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormValues>();

    useEffect(() => {
        if (response.message) {
            setModal({isVisible: true, isError: !!error, message: response.message})
        }
    }, [response])

    useEffect(() => {
        reset({
            name: '',
            link: '',
            img: null,
        })
    }, [isSubmitSuccessful])

    const onSendForm:SubmitHandler<FormValues> = async (data) => {
        const response = await request('/api/works/add-work', 'POST', data)
        setResponse({message: response})
    }


    return (
        <div>
            <h2 className='h2'>Добавить работу</h2>
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
        </div>
    );
};

export default AddWorkPage;
