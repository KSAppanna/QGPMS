import React, { useState } from 'react';
import Production from '../components/MilestoneComponents/Production';
import Qc from '../components/MilestoneComponents/Qc';
import Info from '../components/MilestoneComponents/Info';
import InputFiles from '../components/MilestoneComponents/InputFiles';
import FinalDeliverables from '../components/MilestoneComponents/FinalDeliverables';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const MilestonePage = () => {

  const buttonClass = (active) =>
    `${active ? 'bg-gray-200/50 rounded-md rounded-b-none' : 'bg-transparent'} 
     transition-colors duration-300 ease-in-out sm:text-base text-xs`;


  return (
    <div className='pt-9 overflow-hidden relative h-screen w-full flex flex-col'>
      <div className='h-[7%] w-full text-xs sm:text-base flex justify-between p-1'>
        <div className='flex gap-2'>
          <p>Milestone</p>
          <p>J98847-Drafting</p>
        </div>
        <div className='mr-14'>
          <p>Status:<span className='font-bold'>Completed</span></p>
        </div>
      </div>

      <div className='h-[93%] w-full flex items-start flex-col sm:flex-row'>
        <div className='flex flex-col h-full w-[60%]'>
         <Tabs className="flex flex-col h-full">
        <TabList className="flex gap-8 pb-2 cursor-pointer">
  <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none">Milestone Info</Tab>
  <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none">Production</Tab>
  <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none">QC</Tab>
  <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none">Subtask</Tab>
  <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none">Markup</Tab>
  <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none">Active Task</Tab>
</TabList>



        {/* Milestone Info */}
        <div className='h-full overflow-auto'>
          <TabPanel className=" shadow-sm bg-gray-100/50">
          <div className='flex flex-col gap-8'>
            <Info/>
            <Production/>
            <Qc/>
          </div>
        </TabPanel>
  
        
        {/* Production */}
        <TabPanel>
          <Info/>
        </TabPanel>

        {/* QC */}
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>

        {/* Subtask */}
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>

        {/* Markup */}
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>

        {/* Active Task */}
        <TabPanel>
          <h2>Any content 6</h2>
        </TabPanel>

        </div>
      </Tabs>
        </div>

        <div className='w-[40%] h-[90%] flex flex-col gap-4 overflow-auto'>
          <InputFiles />
          <FinalDeliverables />
        </div>
      </div>
    </div>
  );
};

export default MilestonePage;
