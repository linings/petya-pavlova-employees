import React, { useEffect, useState } from 'react';
import findPairOfEmployeesWorkedTogetherTheLongest from '../getLongestTime';
import styles from './index.module.css';

const FileUploadPage = () => {
    const [chosenFile, setChosenFile] = useState('');
    const [dataToDisplay, setDataToDisplay] = useState('');

    const onChange = (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setChosenFile(e.target.result);
        };
        reader.readAsText(file);
    }

    useEffect(() => {
        setDataToDisplay(findPairOfEmployeesWorkedTogetherTheLongest(chosenFile));
    }, [chosenFile]);

    return (
        <div className={styles['wrapper']}>
            <input className={styles['file-input']} type="file" name="file" onChange={onChange} />
            {console.log(dataToDisplay)}
            {dataToDisplay ?
                <div className={styles['data-grid-wrapper']}>
                    <div className={styles.row1}>
                        <div className={styles.col}>Employee ID #1</div>
                        <div className={styles.col}>Employee ID #2</div>
                        <div className={styles.col}>Project ID</div>
                        <div className={styles.col}>Days worked</div>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles.col}>{dataToDisplay.employee1}</div>
                        <div className={styles.col}>{dataToDisplay.employee2}</div>
                        <div className={styles.col}>{dataToDisplay.projectId}</div>
                        <div className={styles.col}>{dataToDisplay.days}</div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default FileUploadPage;