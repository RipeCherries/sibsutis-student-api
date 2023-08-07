import React, {useRef, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import {AiOutlineCloudUpload} from "react-icons/ai";
import {BsFiletypeJson} from "react-icons/bs";
import {MdDelete} from "react-icons/md";

import "./drop-file-input.css";
import 'react-toastify/dist/ReactToastify.css';

const DropFileInput = () => {
    const wrapperRef = useRef(null);
    const [file, setFile] = useState(null);

    const notify = (text) => {
        toast.error(text);
    }

    const onDragEnter = () => {
        wrapperRef.current.classList.add("dragover");
    }

    const onDragLeave = () => {
        wrapperRef.current.classList.remove("dragover");
    }

    const onDrop = () => {
        wrapperRef.current.classList.remove("dragover");
    }

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];

        if (!newFile) {
            return;
        }

        if (file !== null) {
            notify("Файл уже загружен!");
            return;
        }

        if (!newFile.name.endsWith('.json')) {
            notify("Расширение файла должно быть .json!");
            return;
        }

        setFile((prevFile) => newFile);
        console.log(file);
    }

    const fileRemove = () => {
        setFile(null);
        console.log(file);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <AiOutlineCloudUpload size={100}/>
                    <p>Нажмите или перетащите файл сюда</p>
                    <p className="drop-file-input__label__warning">Допустимый формат файла: <strong>json</strong></p>
                </div>
                <input type="file" onChange={onFileDrop}/>
            </div>
            {file ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Готов к загрузке:</p>
                    <div className="drop-file-preview__item">
                        <div className="drop-file-preview__item__info_wrapper">
                            <BsFiletypeJson size={36}/>
                            <div className="drop-file-preview__item__info">
                                <p>{file.name}</p>
                                <p>{file.size}Б</p>
                            </div>
                        </div>
                        <div
                            onClick={fileRemove}
                            className="drop-file-preview__item__delete"
                        >
                            <MdDelete size={36}/>
                        </div>
                    </div>
                </div>
            ) : null}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                theme="light"
            />
        </>
    );
}

export default DropFileInput;