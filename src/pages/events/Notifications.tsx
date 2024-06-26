import { FC } from "react";
import { UserEvent } from "./Events";
import { MdDelete } from "react-icons/md";
import EmptyPage from "../../components/common/empty/EmptyPage";
import HomeLoading from "../../components/loading/HomeLoading";

interface NotificationsProps {
  events: UserEvent[];
  deleteEvent: (id: string) => void;
  loading: boolean;
}

const Notifications: FC<NotificationsProps> = ({
  events,
  deleteEvent,
  loading,
}) => {
  const formatReminderDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <HomeLoading />;
  }

  return (
    <div className="dark:text-gray-200 text-gray-800 flex flex-col h-screen">
      <span className="text-2xl font-bold mb-10">Events</span>
      <div className="border w-[100%] h-[70%] overflow-auto">
        {events.map((event) => (
          <div key={event.id} className="p-4 border-b">
            <h3 className="text-lg font-semibold text-center">{event.title}</h3>
            <p className="mt-2 text-green-500 border px-3 py-6 rounded-lg dark:bg-white bg-gray-200">
              {event.text}
            </p>
            <div className="flex items-center justify-between mt-3">
              <p className="mt-2 text-orange-700">
                Reminder Date :
                <span className="ml-2">
                  {formatReminderDate(event.reminderDate).substring(0, 10)}
                </span>
              </p>
              <div className="flex items-center">
                {/* <button className="hover:bg-gray-200 rounded-[50px] p-2 dark:hover:bg-gray-600 text-green-500">
                  <FaRegEdit />
                </button> */}
                <button
                  className="hover:bg-gray-200 rounded-[50px] p-2 dark:hover:bg-gray-600 text-red-600"
                  onClick={() => deleteEvent(event.id.toString())}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && <EmptyPage />}
      </div>
    </div>
  );
};

export default Notifications;
