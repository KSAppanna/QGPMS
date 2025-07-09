import React from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';

const FileExtensionIcon = ({ fileName }) => {
  const extension = fileName?.split('.').pop()?.toLowerCase();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <FileIcon
        extension={extension}
        {...(defaultStyles[extension] || defaultStyles.default)}
        labelColor="#fff"
        radius={4}
      />
    </div>
  );
};

export default FileExtensionIcon;
