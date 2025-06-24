// components/Notification.js
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

const Notification = ({
  msgOpen,
  activeFilter,
  setActiveFilter,
  unreadCount,
  serverMessages,
  socket,
  getRelativeTime,
  markAsRead,
}) => {
  const filteredMessages =
    activeFilter === "Unread"
      ? serverMessages.filter((m) => !m.read)
      : serverMessages;

  return (
    <div
      className={`absolute right-0 mt-2 w-[360px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
        msgOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-4 pt-4 pb-2">
        <div className="text-lg font-semibold mb-2">Notifications</div>
        <div className="flex border-b mb-2 space-x-6 text-sm font-medium text-gray-500">
          <button
            className={`pb-2 ${
              activeFilter === "All"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
            onClick={() => setActiveFilter("All")}
          >
            All
          </button>
          <button
            className={`pb-2 ${
              activeFilter === "Unread"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
            onClick={() => setActiveFilter("Unread")}
          >
            Unread
            <span className="ml-1 bg-blue-100 text-blue-600 px-1 rounded text-xs">{unreadCount}</span>
          </button>
          <button
            onClick={() => {
              const unreadIds = serverMessages.filter((m) => !m.read).map((m) => m._id);
              socket.emit("markAllAsRead", unreadIds);
            }}
            className="ml-20 mb-2 border-2 text-xs border-blue-600 text-white bg-blue-600 rounded-md px-2 py-1"
          >
            Mark All as Read
          </button>
        </div>
      </div>

      <div className={classNames("overflow-y-auto px-4 pb-4 space-y-3 flex-1")}>
        {[...filteredMessages].reverse().map((msg, idx) => (
          <div
            key={idx}
            className={classNames(
              "p-3 rounded-md border flex justify-between items-start gap-3",
              msg.read
                ? "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                : "bg-blue-50 border-blue-400 dark:bg-blue-900 dark:border-blue-600"
            )}
          >
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-200 flex gap-0.5">
                <IoPersonCircleOutline className="size-5" />
                {msg.content}
              </p>
              <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">
                {getRelativeTime(msg.timestamp)}
              </p>
            </div>
            {!msg.read && (
              <button
                onClick={() => {
                  const originalIndex = serverMessages.length - 1 - idx;
                  markAsRead(originalIndex);
                }}
                className="ml-4 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
