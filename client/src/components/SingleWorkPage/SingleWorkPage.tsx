import React, {useEffect, useState} from 'react';
import WorkForm from "../WorkForm/WorkForm";
import {SetModal} from "../../App";
import useHttp from "../../hooks/useHttp.hook";
import {useMatch} from "react-router-dom";


const SingleWorkPage = ({setModal}: {setModal:SetModal}) => {
    const {request} = useHttp()
    const match = useMatch(
        "/admin/edit-work/:id"
    );
    const [workState, setWorkState] = useState(
        {
            name: '',
            link: '',
            type: '',
            img: null,
        },
    );

    useEffect(() => {
        (async function () {
            try {
                const response = await request('/api/works/get-single-work', 'POST', {id: match?.params.id}, {'Content-Type': 'application/json'})
                setWorkState(response)
            } catch (e) {
                console.log(e)
            }
        }())
    }, [request])

    return (
        <>
            <h2 className="h2">Редактировать работу</h2>
            <WorkForm formValues={workState} setModal={setModal} isUpdate={true} />
        </>
    );
};

export default SingleWorkPage;