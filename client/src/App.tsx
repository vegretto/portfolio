import React, {createContext, Dispatch, SetStateAction, Suspense, useEffect, useState} from 'react'
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./components/Main/Main";
import Loader from "./components/Loader/Loader";
import useHttp from "./hooks/useHttp.hook";
import Modal from "./components/Modal/Modal";

const AdminNavMenu = React.lazy(() => import("./components/AdminNavMenu/AdminNavMenu"));
const AdminPage = React.lazy(() => import('./components/AdminPage/AdminPage'));
const AddWork = React.lazy(() => import('./components/AddWorkPage/AddWorkPage'));
const EditWorksPage = React.lazy(() => import('./components/EditWorksPage/EditWorksPage'));
const SingleWorkPage = React.lazy(() => import('./components/SingleWorkPage/SingleWorkPage'));
const Works = React.lazy(() => import('./components/Works/Works'));
const Experience = React.lazy(() => import('./components/Experience/Experience'));
const Contacts = React.lazy(() => import('./components/Contacts/Contacts'));
const AddUserPage = React.lazy(() => import('./components/AddUserPage/AddUserPage'));
const LoginPage = React.lazy(() => import('./components/LoginPage/LoginPage'));
const EditExperiencePage = React.lazy(() => import('./components/EditExperiencePage/EditExperiencePage'));
const AddNewExperiencePage = React.lazy(() => import('./components/AddNewExperiencePage/AddNewExperiencePage'));
const SingleExperiencePage = React.lazy(() => import('./components/SingleExperiencePage/SingleExperiencePage'));

type User = {
    isAuthorized?: boolean
}

export type ModalType = {
    message: string,
    isError: boolean,
    isVisible: boolean
}

export type ModalPropsType = {
    message: string,
    isError: boolean,
    isVisible: boolean,
    setModal: Dispatch<SetStateAction<ModalType>>
}

export type SetCurrentUser = (user:User) => void
export type SetModal = (modal:ModalType) => void

export const AuthContext = createContext<User>({})
export const ModalContext = createContext<ModalType>({message: 'test', isError: false, isVisible: false})

function App() {
    const [currentUser, setCurrentUser] = useState<User>({isAuthorized: false})
    const [modal, setModal] = useState<ModalType>({message: 'test', isError:false, isVisible: false})
    const {request, isLoading} = useHttp()

    const checkAuth = async () => {
        try {
            if (localStorage.getItem('token') !== 'undefined') {
                const response = await request('/api/auth/refresh')
                localStorage.setItem('token', response.accessToken)
                setCurrentUser({...currentUser, isAuthorized: true})
            }
        } catch (e:any) {
            console.log(e);
        }
    }

    useEffect( () => {
        checkAuth()
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main setCurrentUser={setCurrentUser}/>,
            children: [
                {
                    path: "/",
                    element: <Suspense fallback={<Loader/>}><Works/></Suspense>,
                },
                {
                    path: "/experience",
                    element: <Suspense fallback={<Loader/>}><Experience/></Suspense>,
                },
                {
                    path: "/contacts",
                    element: <Suspense fallback={<Loader/>}><Contacts/></Suspense>,
                },
            ],
        },
        {
            path: "/admin",
            element: <Suspense fallback={<Loader/>}><AdminPage setModal={setModal} setCurrentUser={setCurrentUser}/></Suspense>,
            children: [
                {
                    path: "/admin",
                    element: <Suspense fallback={<Loader/>}><AdminNavMenu/></Suspense>,
                },
                {
                    path: "/admin/edit-works",
                    element: <Suspense fallback={<Loader/>}><EditWorksPage /></Suspense>,
                },
                {
                    path: "/admin/add-work",
                    element: <Suspense fallback={<Loader/>}><AddWork setModal={setModal}/></Suspense>,
                },
                {
                    path: "/admin/edit-work/:id",
                    element: <Suspense fallback={<Loader/>}><SingleWorkPage setModal={setModal}/></Suspense>,
                },
                {
                    path: "/admin/add-user",
                    element: <Suspense fallback={<Loader/>}><AddUserPage/></Suspense>,
                },
                {
                    path: "/admin/login",
                    element: <Suspense fallback={<Loader/>}><LoginPage setCurrentUser={setCurrentUser} setModal={setModal}/></Suspense>,
                },
                {
                    path: "/admin/edit-experience",
                    element: <Suspense fallback={<Loader/>}><EditExperiencePage /></Suspense>,
                },
                {
                    path: "/admin/add-experience",
                    element: <Suspense fallback={<Loader/>}><AddNewExperiencePage setModal={setModal}/></Suspense>,
                },
                {
                    path: "/admin/edit-experience/:id",
                    element: <Suspense fallback={<Loader/>}><SingleExperiencePage setModal={setModal} /></Suspense>,
                },
            ],
        },


    ]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <AuthContext.Provider value={currentUser}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
            <Modal isVisible={modal.isVisible} isError={modal.isError} message={modal.message} setModal={setModal}/>
        </>
    );
}

export default App;
