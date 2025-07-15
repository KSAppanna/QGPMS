import React, { useState } from 'react';
import axios from 'axios';
import {
  FaFileImage, FaFilePdf, FaFileWord, FaFileAlt,
  FaFileExcel, FaFileArchive, FaFile
} from 'react-icons/fa';
import ProgressBar from './ProgressBar';
import './scrollbar.css';

const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  switch (ext) {
    case 'jpg': case 'jpeg': case 'png': case 'gif':
      return <FaFileImage className="text-blue-500 text-xl" />;
    case 'pdf':
      return <FaFilePdf className="text-red-500 text-xl" />;
    case 'doc': case 'docx':
      return <FaFileWord className="text-blue-700 text-xl" />;
    case 'txt':
      return <FaFileAlt className="text-gray-600 text-xl" />;
    case 'xls': case 'xlsx':
      return <FaFileExcel className="text-green-600 text-xl" />;
    case 'zip': case 'rar':
      return <FaFileArchive className="text-yellow-600 text-xl" />;
    default:
      return <FaFile className="text-gray-500 text-xl" />;
  }
};

const FileUploads = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictFiles, setConflictFiles] = useState([]);

  const handleFilesAdded = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      file,
      status: 'pending',
      progress: 0
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const uploadFiles = async (params = '') => {
    if (uploadedFiles.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    uploadedFiles.forEach(fileObj => {
      formData.append('files', fileObj.file);
    });

    try {
      const res = await axios.post(
        `http://localhost:3000/uploadFiles${params}`,
        formData,
        {
          headers: {
            'x-filenames': JSON.stringify(uploadedFiles.map(f => f.name))
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1;
            const percent = Math.round((progressEvent.loaded * 100) / total);
            setUploadedFiles(prev =>
              prev.map(f => ({ ...f, progress: percent }))
            );
          }
        }
      );

      if (res.status === 200) {
        setUploadedFiles(prev =>
          prev.map(f => ({ ...f, status: 'success', progress: 100 }))
        );
      }
    } catch (error) {
      if (error.response?.status === 409) {
        const conflicts = error.response.data.conflicts || [];
        if (conflicts.length > 0) {
          setConflictFiles(conflicts);
          setShowConflictModal(true);
        }
      } else {
        setUploadedFiles(prev =>
          prev.map(f => ({ ...f, status: 'error' }))
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleUploadFiles = () => uploadFiles();
  const handleOverrideFiles = () => {
    setShowConflictModal(false);
    uploadFiles('?override=true');
  };
  const handleSaveWithNewName = () => {
    setShowConflictModal(false);
    uploadFiles('?rename=true');
  };

  return (
    <div className="flex flex-col border border-blue-100 md:flex-row justify-center items-start  gap-6 p-6 rounded-md shadow max-w-4xl mx-auto w-full h-[380px] bg-white dark:bg-gray-900">
      {/* Drop area */}
      <div
        className="flex-1 basis-[30%] border-2 border-dashed border-blue-400 rounded-md bg-blue-100 dark:bg-gray-800 p-6 flex flex-col justify-center items-center cursor-pointer h-[300px]"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <FaFile className="text-4xl text-blue-500 mb-3" />
        <p className="font-medium text-black dark:text-gray-200">Drop files Here</p>
        <span className="text-gray-500 mb-3">or</span>
        <label className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-500 transition cursor-pointer">
          Browse
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFilesAdded(e.target.files)}
          />
        </label>
      </div>

      {/* File list + upload */}
      <div className="flex flex-col basis-[70%] w-full h-[300px]">
        {uploadedFiles.length > 0 && (
          <div className="flex justify-start text-gray-500 text-sm mb-2 dark:text-gray-400">
            {uploadedFiles.filter(f => f.status === 'success').length}/{uploadedFiles.length}
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-auto space-y-3 blue-scrollbar">
          {uploadedFiles.map(file => (
            <div key={file.id} className="flex items-center rounded-md shadow border border-blue-300 p-4 bg-white dark:bg-gray-800">
              <div className="mr-2 mb-2 size-4">
                {getFileIcon(file.name)}
              </div>
              <div className="flex-1">
                <ProgressBar
                  progress={file.progress}
                  fileName={file.name}
                  onRemove={() => handleRemoveFile(file.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleUploadFiles}
              disabled={uploading}
              className="bg-blue-500 text-white px-2 text-sm py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}
      </div>

      {/* Conflict modal */}
      {showConflictModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow p-6 w-[70%] max-w-2xl space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">File conflict</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">The following files already exist:</p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm max-h-48 overflow-auto">
              {conflictFiles.map((file, idx) => <li key={idx}>{file}</li>)}
            </ul>
            <div className="flex justify-end gap-2">
              <button onClick={handleOverrideFiles} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Replace</button>
              <button onClick={handleSaveWithNewName} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Save</button>
              <button onClick={() => setShowConflictModal(false)} className="text-gray-500 dark:text-gray-300 px-3 py-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploads;
