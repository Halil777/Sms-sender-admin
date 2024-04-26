// import React, { useState } from "react";

// interface Event {
//   title: string;
//   text: string;
//   reminderDate: string; // Assuming reminderDate remains a string
// }

// const AddEvent: React.FC = () => {
//   const [event, setEvent] = useState<Event>({ title: "", text: "", reminderDate: "" });
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedDay, setSelectedDay] = useState(new Date().getDate());
//   const [selectedHour, setSelectedHour] = useState(0);
//   const [selectedMinute, setSelectedMinute] = useState(0);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEvent({ ...event.target, reminderDate: "" }); // Update specific property and clear reminderDate on input change
//   };

//   const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const year = Number(event.target.value);
//     if (/^\d{4}<span class="math-inline">/\.test\(year\.toString\(\)\) && year \>\= 1900 && year <\= 2500\) \{ // Basic validation for year
// setSelectedYear\(year\);
// \}
// \};
// const handleMonthChange \= \(event\: React\.ChangeEvent<HTMLSelectElement\>\) \=\> \{
// setSelectedMonth\(Number\(event\.target\.value\)\);
// \};
// const handleDayChange \= \(event\: React\.ChangeEvent<HTMLInputElement\>\) \=\> \{
// const day \= Number\(event\.target\.value\);
// const maxDays \= new Date\(selectedYear, selectedMonth \+ 1, 0\)\.getDate\(\); // Get max days in the selected month
// if \(/^\\d\{1,2\}</span>/.test(day.toString()) && day > 0 && day <= maxDays) { // Basic validation for day
//       setSelectedDay(day);
//     }
//   };

//   const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const hour = Number(event.target.value);
//     if (/^\d{1,2}<span class="math-inline">/\.test\(hour\.toString\(\)\) && hour \>\= 0 && hour <\= 23\) \{ // Basic validation for hour
// setSelectedHour\(hour\);
// \}
// \};
// const handleMinuteChange \= \(event\: React\.ChangeEvent<HTMLInputElement\>\) \=\> \{
// const minute \= Number\(event\.target\.value\);
// if \(/^\\d\{2\}</span>/.test(minute.toString()) && minute >= 0 && minute <= 59) { // Basic validation for minute
//       setSelectedMinute(minute);
//     }
//   };

//   const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const reminderDate = new Date(selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute).toISOString(); // Convert to ISO string format
//     setEvent({ ...event, reminderDate }); // Update reminderDate in event state
//     // Handle form submission logic (e.g., sending data to server)
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Add Event</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               value={event.title}
//               onChange={handleInputChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
//               Text
//             </label>
//             <textarea
//               name="text"
//               id="text"
//               value={event.text}></textarea>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="reminderDate" className="block text-gray-700 font-bold mb-2">
//               Reminder Date
//             </label>
//             <div className="flex flex-wrap gap-2">
//               <select
//                 name="year"
//                 id="year"
//                 value={selectedYear}
//                 onChange={handleYearChange}
//                 className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               >
//                 {Array.from({ length: 101 }, (_, i) => i + 1900).map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="month"
//                 id="month"
//                 value={selectedMonth}
//                 onChange={handleMonthChange}
//                 className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               >
//                 {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
//                   <option key={month} value={index}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 name="day"
//                 id="day"
//                 min={1}
//                 max={31} // Adjust max based on selected month
//                 value={selectedDay}
//                 onChange={handleDayChange}
//                 className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//               <input
//                 type="number"
//                 name="hour"
//                 id="hour"
//                 min={0}
//                 max={23}
//                 value={selectedHour}
//                 onChange={handleHourChange}
//                 className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//               <input
//                 type="number"
//                 name="minute"
//                 id="minute"
//                 min={0}
//                 max={59}
//                 value={selectedMinute}
//                 onChange={handleMinuteChange}
//                 className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//           </div>
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Save Event
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;

import { FC } from "react";

const AddEvent: FC = () => {
  return <div></div>;
};

export default AddEvent;
