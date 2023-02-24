import React, {useEffect, useState} from 'react';
import useHttp from "../../hooks/useHttp.hook";
import {Link} from "react-router-dom";
import styles from "./edit-experience.module.css";



const EditExperiencePage = () => {
    const {request, error} = useHttp()
    const [experienceState, setExperienceState] = useState([
        {
            _id: 0,
            company: '',
            period: ''
        },
    ]);


    const getExperience = async () => {
        try {
            const data = await request('/api/experience/get-experience')
            setExperienceState(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getExperience()
    }, [request])

    const onDelete = async (id: number) => {
        const response = await request('/api/experience/delete-experience', 'DELETE', {id: id.toString()}, {'Content-Type': 'application/json'})
        getExperience()
    }

    const jobs = experienceState.map((job, index) => {
        return (
                <div className={styles.jobItem} key={job._id}>
                    <span>{experienceState.length - index + '.'} </span>
                    <span>{job.company}</span>
                    <span>{job.period}</span>
                    <Link  to={`/admin/edit-experience/${job._id}`} className={styles.edit}>(ред.)</Link>
                    <span className={styles.delete} onClick={()=>{onDelete(job._id)}}>Х</span>
                </div>

            )
    })

    jobs.reverse()

    return (
        <>
            <h2 className='h2'>Список работ</h2>
            <div className={styles.jobs}>
                {jobs}
            </div>

            <Link className={styles.add} to={'/admin/add-experience'}>+Добавить новый опыт</Link>
        </>
    );
};

export default EditExperiencePage;