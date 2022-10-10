import React from 'react'
import styles from './RefreshButton.module.css';
const RefreshButton = ({ onClick, children }) => {
    return (
        <button className={styles.refreshButton} onClick={onClick}>{children}</button>
    )
}
export default RefreshButton