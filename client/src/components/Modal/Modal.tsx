import React from 'react';
import styles from './modal.module.css'
import { ReactComponent as Cross } from '../../assets/svg/cross.svg';
import { ReactComponent as Error } from '../../assets/svg/errorCat.svg';
import { ReactComponent as Success } from '../../assets/svg/successCat.svg';
import {ModalPropsType} from "../../App";


const Modal = ({message, isError, isVisible, setModal}: ModalPropsType) => {
    const closeModal = () => {
        setModal({message, isError: false, isVisible: false})
    }

    if (!isVisible) return null

    return (
        <div className={styles.modal}>
            <div className={styles.modalBody}>
                <div className={styles.close} onClick={closeModal}><Cross /></div>
                {isError && <div className={styles.title}>Ой! Ошибка</div>}
                {isError && <div className={styles.error}><Error /></div>}
                {!isError && <div className={styles.success}><Success /></div>}
                <div className={styles.message}>{message}</div>
            </div>
            <div className={styles.bg} onClick={closeModal}/>
        </div>
    );
};

export default Modal;