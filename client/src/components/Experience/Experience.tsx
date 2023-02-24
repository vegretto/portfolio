import styles from "../Experience/experience.module.css";
import {useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp.hook";

export type ExperienceType = {
    _id: number,
    company: string,
    link: string,
    companyDescription: string,
    companyDescriptionDetails: Array<string>,
    jobTitle: string,
    jobResponsibilities: Array<string>,
    period: string
}

const Experience = () => {
    const {request} = useHttp()
    const [experienceState, setExperienceState] = useState<Array<ExperienceType>>([
        {
            _id: 0,
            company: '',
            link: '#',
            companyDescription: '',
            companyDescriptionDetails: [''],
            jobTitle: '',
            jobResponsibilities: [''],
            period: ''
        },
    ]);

    useEffect(() => {
        (async function () {
            try {
                const data = await request('/api/experience/get-experience')
                setExperienceState(data)
            } catch (e) {
                console.log(e)
            }
        })()

    }, [request])

    const jobs = experienceState.map((job) => {
        return (
            <div className={styles.jobItem} key={job._id}>
                <div className={styles.jobDates}>
                    {job.period}
                </div>
                <div className={styles.jobDescription}>
                    <div className={styles.jobName}>{job.company}</div>
                    <a href={`https://${job.link}/`} target='_blank' rel="noreferrer" className={styles.jobLink}>{job.link}</a>
                    <div className={styles.jobOverall}>
                        {job.companyDescription}
                        <ul>
                            {job.companyDescriptionDetails.map((detail) => {
                                return <li key={job._id}>{detail}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <p><strong>{job.jobTitle}</strong></p>
                        {job.jobResponsibilities.map((responsibility) => {
                            return <p key={job._id}>{responsibility}</p>
                        }) }
                    </div>
                </div>
            </div>
        )
    })

    jobs.reverse()

    return (
        <section id='experience' className={styles.section}>
            <div className={styles.container}>
                <h2 className='h2'>Опыт</h2>
                <div className={styles.jobs}>
                    {jobs}
                </div>
            </div>
        </section>
    )
}

export default Experience