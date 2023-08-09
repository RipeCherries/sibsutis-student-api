import React, {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import {AiOutlineCloudUpload} from "react-icons/ai";
import {BsFiletypeJson} from "react-icons/bs";
import {MdDelete} from "react-icons/md";
import {setUploadedFile, clearUploadedFile} from "../../store/fileReducer";
import "./drop-file-input.css";
import 'react-toastify/dist/ReactToastify.css';


const DropFileInput = () => {
    const wrapperRef = useRef(null);
    const uploadedFile   = useSelector(state => state.file.uploadedFile);
    const dispatch = useDispatch();

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

        if (uploadedFile !== null) {
            notify("Файл уже загружен!");
            return;
        }

        if (!newFile.name.endsWith('.json')) {
            notify("Расширение файла должно быть .json!");
            return;
        }

        dispatch(setUploadedFile(newFile));
    }

    const fileRemove = () => {
        dispatch(clearUploadedFile());
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
            {uploadedFile ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Готов к загрузке:</p>
                    <div className="drop-file-preview__item">
                        <div className="drop-file-preview__item__info_wrapper">
                            <BsFiletypeJson size={36}/>
                            <div className="drop-file-preview__item__info">
                                <p>{uploadedFile.name}</p>
                                <p>{uploadedFile.size}Б</p>
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