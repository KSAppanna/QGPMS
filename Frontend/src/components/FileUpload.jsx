import React from 'react';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import {
    FaFileImage, FaFilePdf, FaFileWord, FaFileAlt,
    FaFileExcel, FaFileArchive, FaFile, FaTimes
} from 'react-icons/fa';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return <FaFileImage className="text-blue-500 text-xl" />;
        case 'pdf':
            return <FaFilePdf className="text-red-500 text-xl" />;
        case 'doc':
        case 'docx':
            return <FaFileWord className="text-blue-700 text-xl" />;
        case 'txt':
            return <FaFileAlt className="text-gray-600 text-xl" />;
        case 'xls':
        case 'xlsx':
            return <FaFileExcel className="text-green-600 text-xl" />;
        case 'zip':
        case 'rar':
            return <FaFileArchive className="text-yellow-600 text-xl" />;
        default:
            return <FaFile className="text-gray-500 text-xl" />;
    }
};

const FileUploads = () => {
    const customItemTemplate = (file, props) => {
        return (
            <div className="flex flex-col gap-1 p-2 border rounded shadow-sm bg-white mb-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {getFileIcon(file.name)}
                        <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <button
                        onClick={() => props.onRemove(file)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove"
                    >
                        <FaTimes />
                    </button>
                </div>
                <ProgressBar value={props?.progress || 0} showValue={false} style={{ height: '8px' }} />
            </div>
        );
    };

    return (
        <div className="card text-center" style={{ maxWidth: 600, margin: '50px auto' }}>
            <h2>Upload Files</h2>
            <div className="card">
                <FileUpload
                    name="demo[]"
                    url={'/api/upload'}
                    multiple
                    accept="*"
                    maxFileSize={1000000}
                    itemTemplate={customItemTemplate}
                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                />
            </div>
        </div>
    );
};

export default FileUploads;
