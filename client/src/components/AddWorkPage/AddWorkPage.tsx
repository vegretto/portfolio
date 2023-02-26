import React from 'react';
import {SetModal} from "../../App";
import WorkForm from "../WorkForm/WorkForm";


const AddWorkPage = ({setModal}: {setModal:SetModal}) => {

    return (
        <div>
            <h2 className='h2'>Добавить работу</h2>
            <WorkForm setModal={setModal} isUpdate={false} />
        </div>
    );
};

export default AddWorkPage;
