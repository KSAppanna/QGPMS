import React from 'react'
import ProjectInfo from '../components/createProjectComponents/ProjectInfo'
import Comments from '../components/createProjectComponents/Comments'

const CreateProjectPage = () => {
  return (
    <>
      <div className="pt-10 overflow-hidden relative h-screen w-fulloverflow-y-auto flex-2 basis-0 bg-transparent flex flex-col"> 
        <ProjectInfo />
        {/* <Comments/> */}
      </div>
    </>
  );
};
export default CreateProjectPage