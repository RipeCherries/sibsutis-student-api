import React, {useRef, useState} from "react";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {BsFiletypeJson} from "react-icons/bs";
import {MdDelete} from "react-icons/md";

import "./drop-file-input.css";

const DropFileInput = ({onFileChange}) => {
    const wrapperRef = useRef(null);
    const [file, setFile] = useState([]);

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
        if (newFile) {
            const updatedFiles = [...file, newFile];
            setFile(updatedFiles);
        }
    }

    const fileRemove = (file) => {
        // TODO: добавить удаление файла из стейта, а также сделать проверку на тип файла json и загрузку только одного - как итог проверок должны быть алерты
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
            {
                file.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">Готов к загрузке:</p>
                        {
                            file.map((item, index) => (
                                <div
                                    key={index}
                                    className="drop-file-preview__item"
                                >
                                    <div className="drop-file-preview__item__info_wrapper">
                                        <BsFiletypeJson size={36}/>
                                        <div className="drop-file-preview__item__info">
                                            <p>{item.name}</p>
                                            <p>{item.size}Б</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => fileRemove(item)}
                                        className="drop-file-preview__item__delete"
                                    >
                                        <MdDelete size={36}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

export default DropFileInput;