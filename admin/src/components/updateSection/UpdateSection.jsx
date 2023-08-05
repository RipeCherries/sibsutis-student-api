import React from "react";
import "./update-section.css";
import DropFileInput from "../drop-file-input/DropFileInput";

const UpdateSection = () => {
    return (
        <section className="update-section">
            <h2 className="update-section__title">Обновление данных расписания:</h2>
            <div className="update-section__file-upload">
                <DropFileInput />
            </div>
        </section>
    )
}

export default UpdateSection;