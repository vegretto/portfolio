import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";
import {SetCurrentUser} from "../../App";
import Modal from "../Modal/Modal";

const Main = ({setCurrentUser}: {setCurrentUser: SetCurrentUser}) => {

    return (
        <>
            <Header setCurrentUser={setCurrentUser}/>
            <Outlet />
        </>
    );
};

export default Main;