import React from "react";
import {useSelector, useDispatch} from "react-redux";
import "./update-section.css";
import DropFileInput from "../drop-file-input/DropFileInput";
import CalendarPicker from "../calendar-picker/CalendarPicker";
import {setStartOfSemester} from "../../store/startOfSemesterReducer";

const UpdateSection = () => {
    const startDate = useSelector(state => state.startOfSemester.date);
    const dispatch = useDispatch();

    const handleDateChange = (newDate) => {
        dispatch(setStartOfSemester(newDate));
    }

    return (
        <section className="update-section">
            <h2 className="update-section__title">Обновление данных расписания:</h2>
            <div className="update-section__controls">
                <div className="update-section__file-upload">
                    <DropFileInput/>
                </div>
                <div className="update-section__date-picker">
                    <h5 className="update-section__date-picker__title">Дата начала семестра:</h5>
                    <CalendarPicker value={startDate} onChange={handleDateChange}/>
                </div>
            </div>
        </section>
    )
}

export default UpdateSection;