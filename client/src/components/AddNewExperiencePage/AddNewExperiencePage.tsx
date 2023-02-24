import React from 'react';
import ExperienceForm from "../ExperinceForm/ExperienceForm";
import {SetModal} from "../../App";




const AddNewExperiencePage = ({setModal}: {setModal:SetModal}) => {

    return (
        <>
            <h2 className='h2'>Добавить опыт</h2>
            <ExperienceForm setModal={setModal} isUpdate={false}/>
        </>
    );
};

export default AddNewExperiencePage;