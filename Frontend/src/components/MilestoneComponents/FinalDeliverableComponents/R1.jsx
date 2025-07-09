import React,{useState, useEffect} from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import zipFileData from "../../../zipFile.json"
import InputMilestoneTable from '../InputMilestoneTable';

const R1 = () => {

    
      const [openR1, setOpenR1] = useState(false);

      const [rowData, setRowData] = useState([]);
        const [selectedFiles, setSelectedFiles] = useState([]);


         useEffect(() => {
    const mapped = zipFileData.map((item, idx) => ({
      ...item,
      boolean: false,
      SNo: item.SNo || idx + 1,
      'Created Date': item['Created Date'] || '',
      Size: item.Size || '',
      Type: item.Type || '',
      Owner: item.Owner || '',
      path: item.path || '',
    }));
    setRowData(mapped);
  }, []);

  const updateSelection = (row, isSelected) => {
    setSelectedFiles(prev =>
      isSelected ? [...prev, row] : prev.filter(file => file.SNo !== row.SNo)
    );

    setRowData(prev =>
      prev.map(item =>
        item.SNo === row.SNo ? { ...item, boolean: isSelected } : item
      )
    );
  };

  const handleDownload = () => {
    selectedFiles.forEach(file => {
      const link = document.createElement('a');
      link.href = file.path;
      link.download = file.Name || 'file.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleDelete = () => {
    const selectedSNos = selectedFiles.map(file => file.SNo);
    const updatedData = rowData.filter(row => !selectedSNos.includes(row.SNo));
    setRowData(updatedData);
    setSelectedFiles([]);
  };
    
      
  return (
     <div className='w-full'>
              <div
                onClick={() => setOpenR1(prev => !prev)}
                className="bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 hover:from-blue-600 hover:via-sky-400 hover:to-blue-300 text-white px-3 h-[36px] rounded-lg flex gap-2 items-center cursor-pointer transition-colors shadow-lg backdrop-blur-md bg-opacity-90"
              >
                <span>{openR1 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                R1              </div>
        
              <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            openR1 ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-2 p-2 rounded shadow bg-white">
            {rowData.length === 0 ? (
              <p className="text-gray-500 italic text-center">No Attachments</p>
            ) : (
              <div className="ag-theme-alpine w-full overflow-auto">
                 <InputMilestoneTable
              rowData={rowData}
              selectedFiles={selectedFiles}
              updateSelection={updateSelection}
              handleDownload={handleDownload}
              handleDelete={handleDelete}
            />
              </div>
            )}
          </div>
        </div>
        
            </div>
  )
}

export default R1