import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import FileUploads from '../components/FileUpload'



const OwnerDropdownPage = () => {


  return (
    <>
      <div className='flex flex-col gap-10'>
        <Dropdown />

        <FileUploads />

      </div>


    </>
  );
};

export default OwnerDropdownPage;
