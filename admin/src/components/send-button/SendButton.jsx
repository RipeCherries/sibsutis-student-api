import React, {useState} from "react";
import {IoSend} from "react-icons/io5";
import {FiLoader} from "react-icons/fi";
import {MdCloudDone} from "react-icons/md";
import axios from "axios";
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from "react-redux";
import {clearUploadedFile} from "../../store/fileReducer";
import {clearStartOfSemester} from "../../store/startOfSemesterReducer";
import fileRead from "../../utils/fileRead";
import getGroups from "../../utils/getGroups";
import formatLessons from "../../utils/formatLessons";

import "./send-button.css";
import {setLastUpdate} from "../../store/lastUpdateReducer";

const SendButton = () => {
    const startOfSemester = useSelector(store => store.startOfSemester.date);
    const uploadedFile = useSelector(store => store.file.uploadedFile);
    const dispatch = useDispatch();

    const [fetching, setFetching] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleSubmit = async () => {
        setFetching((prevState) => !prevState);

        if (!startOfSemester) {
            toast.error("Некорректная дата начала семестра!");
            setFetching((prevState) => !prevState);
            return;
        }

        if (!uploadedFile) {
            toast.error("Отсутствует файл с расписанием!");
            setFetching((prevState) => !prevState);
            return;
        }

        try {
            const lessons = await fileRead(uploadedFile);
            const groups = getGroups(JSON.parse(lessons));
            const formattedLessons = formatLessons(JSON.parse(lessons), groups);

            await axios.put("http://localhost:8080/start-of-semester", {date: startOfSemester.getTime()});
            await axios.put("http://localhost:8080/groups", groups);
            await axios.put("http://localhost:8080/lessons", formattedLessons);
            await axios.put("http://localhost:8080/last-update", {date: new Date().getTime()});

            fetchLastUpdate();

            setFetching((prevState) => !prevState);
            setComplete((prevState) => !prevState);
        } catch (error) {
            toast.error(error.message);
            setFetching((prevState) => false);
            setComplete((prevState) => false);
        }

        dispatch(clearUploadedFile());
        dispatch(clearStartOfSemester());
    }

    const fetchLastUpdate = () => {
        axios.get('http://localhost:8080/last-update').then(response => {
            const data = response.data;
            const lastUpdateDate = new Date(data.date);
            dispatch(setLastUpdate(lastUpdateDate));
        }).catch(error => {
            console.log(error);
        });
    }

    const isDisabled = () => {
        return fetching || complete;
    }

    return (
        <button
            disabled={isDisabled()}
            onClick={handleSubmit}
            className="send-button"
        >
            {fetching ? (<FiLoader/>) : complete ? (<MdCloudDone/>) : (<IoSend/>)}
            {fetching ? "Обработка данных" : complete ? "Готово" : "Отправить"}
        </button>
    );
}

export default SendButton;