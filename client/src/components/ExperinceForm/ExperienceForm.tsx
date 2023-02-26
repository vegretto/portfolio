import React, {useEffect, useState} from 'react';
import useHttp from "../../hooks/useHttp.hook";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "../AddWorkPage/add-work-page.module.css";
import {SetModal} from "../../App";

type FormFieldsType = {
    _id: number,
    company: string,
    link: string,
    companyDescription: string,
    companyDescriptionDetails:string,
    jobTitle: string,
    jobResponsibilities: string,
    period: string
}

const ExperienceForm = ({formValues, setModal, isUpdate}: {formValues?: FormFieldsType, setModal:SetModal, isUpdate: boolean} ) => {
    const {request, error} = useHttp()
    const [response, setResponse] = useState({message: ''})

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm<FormFieldsType>();

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

    useEffect(() => {
        if (response.message) {
            setModal({isVisible: true, isError: false, message: response.message})
        } else if (error) {
            setModal({isVisible: true, isError: true, message: error})
        }
    }, [response, error])

    const onSendForm: SubmitHandler<FormFieldsType> = async (data) => {
        try {
            const formattedData = {
                ...data,
                companyDescriptionDetails: data.companyDescriptionDetails.split('\n'),
                jobResponsibilities: data.jobResponsibilities.split('\n')
            }
            if (!isUpdate) {
                const response = await request('/api/experience/add-experience', 'POST', formattedData, {'Content-Type': 'application/json'})
                setResponse({message: response})
            } else {
                const response = await request('/api/experience/update-experience', 'POST', formattedData, {'Content-Type': 'application/json'})
                setResponse({message: response})
            }
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSendForm)}>
            <label> Компания
                <input {...register('company', {required: true})} />
                {errors.company && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Сайт
                <input {...register('link', {required: true})} />
                {errors.link && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Деятельность компании
                <input {...register('companyDescription', {required: true})} />
                {errors.companyDescription && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Детали деятельности компании
                <textarea {...register('companyDescriptionDetails', {required: true})} />
                {errors.companyDescriptionDetails && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Должность
                <input {...register('jobTitle', {required: true})} />
                {errors.jobTitle && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Обязанности
                <textarea {...register('jobResponsibilities', {required: true})} />
                {errors.jobResponsibilities && <span className={styles.error}>Заполните поле</span>}
            </label>
            <label> Период работы
                <input {...register('period', {required: true})} />
                {errors.period && <span className={styles.error}>Заполните поле</span>}
            </label>
            <input type="submit"/>
        </form>
    );
};

export default ExperienceForm;