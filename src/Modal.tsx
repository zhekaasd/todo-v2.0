import styles from "./modal.module.scss";
import React from "react";


export const Modal = (props: {active: boolean, setActive: (value: boolean) => void, }) => {
    return <div onClick={() => props.setActive(false)} className={styles.modal}>
        <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>

        </div>
    </div>
}