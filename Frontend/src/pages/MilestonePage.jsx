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
    <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none dark:bg-transparent">Milestone Info</Tab>
    <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none dark:bg-transparent">Production</Tab>
    <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none dark:bg-transparent">QC</Tab>
    <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none dark:bg-transparent">Subtask</Tab>
    <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none dark:bg-transparent">Markup</Tab>
    <Tab selectedClassName="bg-gray-100/50 rounded-md rounded-b-none border-none dark:bg-transparent">Active Task</Tab>
  </TabList>



          {/* Milestone Info */}
          <div className='h-full overflow-auto'>
            <TabPanel className=" shadow-sm bg-gray-100/50 dark:bg-gray-900">
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


//   import React, { useState } from 'react';
// import Production from '../components/MilestoneComponents/Production';
// import Qc from '../components/MilestoneComponents/Qc';
// import Info from '../components/MilestoneComponents/Info';
// import InputFiles from '../components/MilestoneComponents/InputFiles';
// import FinalDeliverables from '../components/MilestoneComponents/FinalDeliverables';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// const MilestonePage = () => {
//   return (
//     <div className="pt-9 overflow-hidden relative h-screen w-full flex flex-col bg-gray-100 text-gray-800">
      
//       {/* Header Section */}
//       <div className="h-[7%] w-full text-sm sm:text-base flex justify-between items-center px-6 py-2 bg-white border-b border-gray-300 shadow-sm">
//         <div className="flex gap-2 font-medium">
//           <p>Milestone:</p>
//           <p className="text-blue-600">J98847-Drafting</p>
//         </div>
//         <div className="text-sm text-gray-600">
//           Status: <span className="font-bold text-green-600">Completed</span>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="h-[93%] w-full flex items-start flex-col sm:flex-row p-4 gap-4">

//         {/* Left Side - Tabs */}
//         <div className="flex flex-col h-full w-full sm:w-[60%] bg-white border border-gray-300 rounded-md shadow-sm">
//           <Tabs className="flex flex-col h-full">
            
//             {/* Tab Buttons */}
//             <TabList className="flex gap-2 px-4 pt-3 border-b border-gray-200 text-sm font-medium">
//               {["Milestone Info", "Production", "QC", "Subtask", "Markup", "Active Task"].map((label, i) => (
//                 <Tab
//                   key={i}
//                   className="px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded-t-md"
//                   selectedClassName="bg-white text-blue-600 border border-gray-300 border-b-white rounded-t-md shadow-sm"
//                 >
//                   {label}
//                 </Tab>
//               ))}
//             </TabList>

//             {/* Tab Panels */}
//             <div className="h-full overflow-auto p-4">
//               {/* Tab 1: Milestone Info */}
//               <TabPanel>
//                 <div className="flex flex-col gap-6">
//                   <Info />
//                   <Production />
//                   <Qc />
//                 </div>
//               </TabPanel>

//               {/* Tab 2: Production */}
//               <TabPanel>
//                 <Info />
//               </TabPanel>

//               {/* Tab 3: QC */}
//               <TabPanel>
//                 <p className="text-gray-700">Any content 3</p>
//               </TabPanel>

//               {/* Tab 4: Subtask */}
//               <TabPanel>
//                 <p className="text-gray-700">Any content 4</p>
//               </TabPanel>

//               {/* Tab 5: Markup */}
//               <TabPanel>
//                 <p className="text-gray-700">Any content 5</p>
//               </TabPanel>

//               {/* Tab 6: Active Task */}
//               <TabPanel>
//                 <p className="text-gray-700">Any content 6</p>
//               </TabPanel>
//             </div>
//           </Tabs>
//         </div>

//         {/* Right Side - Files & Deliverables */}
//         <div className="w-full sm:w-[40%] h-full flex flex-col gap-4 overflow-auto">
//           <div className="bg-white rounded-md border border-gray-300 shadow-sm p-4">
//             <InputFiles />
//           </div>
//           <div className="bg-white rounded-md border border-gray-300 shadow-sm p-4">
//             <FinalDeliverables />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MilestonePage;
