import React, { useState } from 'react';
import findPairOfEmployeesWorkedTogetherTheLongest from '../getLongestTime';
import styles from './index.module.css';


const FileUploadPage = () => {
    const [chosenFile, setChosenFile] = useState('');

    const onChange = (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setChosenFile(e.target.result);
        };
        reader.readAsText(file);
    }

    return (
        <div className={styles['input-wrapper']}>
            <input type="file" name="file" onChange={onChange} />
            <div>
                {chosenFile ? findPairOfEmployeesWorkedTogetherTheLongest(chosenFile) : null}
            </div>
        </div>
    )
}

export default FileUploadPage;