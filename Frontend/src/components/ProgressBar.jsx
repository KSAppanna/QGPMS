import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { FaTimes } from 'react-icons/fa';

function ProgressBar({ progress, fileName, onRemove }) {
  return (
    <Box sx={{ width: 500, ml: 1 }}> {/* smaller marginLeft */}
      <div className="flex items-start justify-between mb-0.5"> {/* tighter margin bottom */}
        <p className="text-xs text-black font-medium truncate dark:text-white">{fileName}</p> {/* smaller text */}
        <button onClick={onRemove} className=" flex items-center"> {/* reduced left margin */}
          <FaTimes className="text-red-500 hover:text-red-700 text-lg transition" />
        </button>
      </div>
      <div className="flex items-start justify-between">
        <LinearProgress
          variant="determinate"
          value={progress}
          className="flex-1 mr-2"
        />
        <span className="text-black text-xs dark:text-white">{progress}%</span> 
      </div>
    </Box>
  );
}

export default ProgressBar;
