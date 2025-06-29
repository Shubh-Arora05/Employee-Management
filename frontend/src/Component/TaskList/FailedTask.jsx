import React from 'react'
import { format } from 'date-fns';
const FailedTask = ({data}) => {

  // const cur_data = (item) => {
  //   const options = { year: "4-digit", month: "2-digit", day: "2-digit" };
  
  //   // Convert the date to a Date object if it's a string
  //   const date = new Date(item.date);
  
  //   // Check if it's a valid date
  //   if (date instanceof Date && !isNaN(date)) {
  //     const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
  //     const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
      
  //     // Format to dd-mm-yy
  //     item.date = `${day}-${month}-${year}`;
  //   } else {
  //     console.log("Invalid date:", item.date);
  //     return null; // Or return some default value if needed
  //   }
  
  //   // console.error("Invalid date:", item.date);
  
  //   return item.date;
  // };

    
  return (
    <div className='h-fit'>
    <div className="bg-red-400   rounded-2xl p-5 flex-shrink-0    flex flex-col gap-2 ">
    <div className="flex flex-col justify-between p-2">
    <h1 className="text-center text-xl md:text-2xl  p-3">Failed Task</h1>
      <h3 className="text-md w-fit  text-white rounded-md font-bold bg-red-700  p-2">
        {data.category}
      </h3>

      <h4 className="font-medium text-xl">{format(new Date(data.date), 'yyyy-MM-dd')}</h4>
    </div>
    <h2 className="font-medium text-3xl p-1">{data.title}</h2>

    <div className="font-medium text-md h-fit w-full break-words whitespace-pre-wrap overflow-x-hidden">
     {data.description}
    </div>
   
      

  </div>
</div>

  )
}

export default FailedTask