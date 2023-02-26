import React, {useEffect, useState} from 'react';
import styles from "../EditExperiencePage/edit-experience.module.css";
import {Link} from "react-router-dom";
import useHttp from "../../hooks/useHttp.hook";

const EditWorksPage = () => {
    const {request, error} = useHttp()
    const [worksState, setWorksState] = useState([
        {
            _id: 0,
            name: ''
        },
    ]);

    const getWorks = async () => {
        try {
            const data = await request('/api/works/get-works')
            setWorksState(data)
        } catch (e) {
            console.log(e)
        }
    }

    const onDelete = async (id: number) => {
        const response = await request('/api/works/delete-work', 'DELETE', {id: id.toString()}, {'Content-Type': 'application/json'})
        getWorks()
    }

    useEffect(() => {
        getWorks()
    }, [request])

    const works = worksState.map((work, index) => {
        return (
            <div className={styles.jobItem} key={work._id}>
                <span>{index + 1 + '. '} </span>
                <span>{work.name}</span>
                <Link  to={`/admin/edit-work/${work._id}`} className={styles.edit}>(ред.)</Link>
                <span className={styles.delete} onClick={()=>{onDelete(work._id)}}>Х</span>
            </div>

        )
    })


    return (
        <>
            <h2 className='h2'>Список работ</h2>
            <div className={styles.jobs}>
                {works}
            </div>

            <Link className={styles.add} to={'/admin/add-work'}>+Добавить новую работу</Link>
        </>
    );
};

export default EditWorksPage;