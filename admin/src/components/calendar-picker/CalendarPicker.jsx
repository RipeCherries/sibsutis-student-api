import React, {useRef} from "react";
import Calendar from "react-calendar";

import useDetect from "../../hooks/useDetect";
import {locale, calendarOptions} from "./calendarConfig";

import "./calendar-picker.css";
import {IoCalendarOutline} from "react-icons/io5";

const CalendarPicker = ({value, onChange, isDisabled=false}) => {
    const calendarRef = useRef(null);
    const [active, setActive] = useDetect(calendarRef, false);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!isDisabled) {
            setActive((prevState) => !prevState);
        }
    }

    const onChangeDate = (date) => {
        onChange(date);
        setActive((prevState) => !prevState);
    }

    return (
        <>
            <div
                className="calendar-picker"
                data-active={isDisabled ? 'inactive' : 'active'}
                data-focused={active ? 'focused' : ''}
                onClick={handleClick}
            >
                <p className="calendar-picker__date">
                    {`${value.getDate()} ${locale.months[value.getMonth()]} ${value.getFullYear()}`}
                </p>
                <IoCalendarOutline />
                <div
                    className="calendar"
                    data-active={active ? 'active' : 'inactive'}
                    onClick={e => e.stopPropagation()}
                    ref={calendarRef}
                >
                    <Calendar
                        {...calendarOptions}
                        onChange={(date) => onChangeDate(date)}
                        value={value}
                    />
                </div>
            </div>

        </>
    )
}

export default CalendarPicker;