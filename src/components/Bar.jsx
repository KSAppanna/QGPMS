import React from 'react'

const Bar = () => {
    return (
        // The bar at the top of the left div
        // This bar contains the task name and the status of the task
        <>
            <div className='w-[100%] h-[30px] flex justify-between items-center px-2'>
                <div className='ml-0 flex'>
                    <button className='color-white bg-blue-400 w-[50px] rounded-sm'>Task</button>
                    <div className='ml-2'>
                        Fine-1 Sector
                    </div>
                </div>

                <div className='mr-0 flex'>
                <div className="mr-4 flex items-center">
  <span>Status:</span>
  <button className="bg-yellow-400 w-10 rounded-xl ml-2">WIP</button>
</div>
                    <button className='w-[70px] rounded-sm bg-blue-400'>Submit</button>
                    
                </div>
            </div>
        </>
    )
}

export default Bar