import React, {useEffect, useState} from 'react';
import ExperienceForm from "../ExperinceForm/ExperienceForm";
import {useMatch} from "react-router-dom";
import useHttp from "../../hooks/useHttp.hook";
import {SetModal} from "../../App";

const SingleExperiencePage = ({setModal}: {setModal:SetModal}) => {
    const {request} = useHttp()
    const match = useMatch(
        "/admin/edit-experience/:id"
    );
    const [experienceState, setExperienceState] = useState(
        {
            _id: 0,
            company: '',
            link: '#',
            companyDescription: '',
            companyDescriptionDetails: '',
            jobTitle: '',
            jobResponsibilities: '',
            period: ''
        },
    );

    useEffect(() => {
        (async function () {
            try {
                const response = await request('/api/experience/get-single-experience', 'POST', {id: match?.params.id}, {'Content-Type': 'application/json'})
                setExperienceState({
                    ...response,
                    companyDescriptionDetails: response.companyDescriptionDetails.join(' \n'),
                    jobResponsibilities: response.jobResponsibilities.join(' \n')
                })

            } catch (e) {
                console.log(e)
            }
        }())
    }, [request])

    return (
        <>
            <h2 className="h2">Редактировать опыт</h2>
            <ExperienceForm formValues={experienceState} setModal={setModal} isUpdate={true}/>
        </>
    );
};

export default SingleExperiencePage;