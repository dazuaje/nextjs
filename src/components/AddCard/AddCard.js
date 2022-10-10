import React from 'react'
import styles from './AddCard.module.css'
const AddCard = ({ onClick }) => {
    return (
        <button className={styles.button__add} onClick={onClick}></button>
    )
}
export default AddCard