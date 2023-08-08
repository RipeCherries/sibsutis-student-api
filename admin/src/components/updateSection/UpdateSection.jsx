import React, {useState} from "react";
import "./update-section.css";
import DropFileInput from "../drop-file-input/DropFileInput";
import CalendarPicker from "../calendar-picker/CalendarPicker";

const UpdateSection = () => {
    const [date, setDate] = useState(new Date());

    return (
        <section className="update-section">
            <h2 className="update-section__title">Обновление данных расписания:</h2>
            <div className="update-section__controls">
                <div className="update-section__file-upload">
                    <DropFileInput />
                </div>
                <div className="update-section__date-picker">
                    <h5 className="update-section__date-picker__title">Дата начала семестра:</h5>
                    <CalendarPicker value={date} onChange={setDate} />
                </div>
            </div>
        </section>
    )
}

export default UpdateSection;