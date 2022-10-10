import React from "react";
import styles from './Card.module.css';
const Card = ({ index, src, onClick, loader }) => {
    return (
        <div className={styles.container__image}>
            <div
                className={styles.image}
                style={{ backgroundImage: `url(${src})` }}
                onClick={onClick}
            ></div>
            <div className={`${loader} && ${styles.overlay.loading}`}></div>
        </div >
    );
};

export default Card;