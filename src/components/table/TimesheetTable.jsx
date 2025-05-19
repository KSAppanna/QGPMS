import React from 'react'

const TimesheetTable = ({isOpen,tasks}) => {
  return (
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden w-full max-w-xl ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 p-4 bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto overflow-y-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">End</th>
                  <th className="px-4 py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                      No entries yet.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{task.user}</td>
                      <td className="px-4 py-2">{task.startTime}</td>
                      <td className="px-4 py-2">{task.endTime}</td>
                      <td className="px-4 py-2">{task.duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default TimesheetTable