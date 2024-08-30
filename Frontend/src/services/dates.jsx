import { format } from "date-fns";

export const formatDate = (date) => {
  const currentDate = new Date();
  const formattedDate = new Date(date);
  const time = `${String(formattedDate.getUTCHours()).padStart(
    2,
    '0'
  )}:${String(formattedDate.getUTCMinutes()).padStart(2, '0')}`;
  const difference = currentDate.getDate() - formattedDate.getUTCDate();
  if (!date) {
    return `${formattedDate.getUTCDate()} ${formattedDate.toLocaleString(
      'es-ES',
      {
        month: 'short',
      }
    )} a las ${time}`;
  }

  if (difference === -1) {
    return `Mañana a las ${time}`;
  } else if (difference === 0) {
    return `Hoy a las ${time}`;
  } else if (difference === 1) {
    return `Ayer a las ${time}`;
  } else {
    return `${formattedDate.getDate()} ${formattedDate.toLocaleString(
      'es-ES',
      { month: 'short' }
    )}. a las ${time}`;
  }
};


export const determineDateStatus = (date, myCard) => {
  const statusOptions = {
    overdue: "#F87168",   
    dueSoon: "#F5CD47",   
    onTime: "#6985ff",     
    completed: "#4BCE97",  
  };


  const currentDate = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);
  const dueDate = new Date(date);

  if (myCard.is_completed) return statusOptions.completed;

  const differenceInMs = dueDate - currentDate;

  if (differenceInMs > 0) {
    const oneHourInMs = 60 * 60 * 1000; 
    const oneDayInMs = 24 * oneHourInMs; 

    if (differenceInMs >= oneDayInMs) {
      return statusOptions.onTime; 
    }

    if (differenceInMs >= oneHourInMs) {
      return statusOptions.onTime;
    }
    
    const differenceMinutes = Math.floor(differenceInMs / (60 * 1000));
    if (differenceMinutes > 0) {
      return statusOptions.dueSoon;
    }
  }

  return statusOptions.overdue; 
};

export const originalFormat = (date, time) => {
  const [day, month, year] = date.split("/");
  const [hours, minutes] = time.split(":");
  if (
    day !== "" &&
    month !== "" &&
    year !== "" &&
    hours !== "" &&
    minutes !== ""
  ) {
    const originalDate = new Date();
    originalDate.setTime(Date.UTC(year, month - 1, day, hours, minutes, 0));
    originalDate.setTime(
      originalDate.getTime() - originalDate.getTimezoneOffset() * 60000
    );
    const convertedDate = new Date(originalDate.toISOString().slice(0, -1));
    convertedDate.setTime(convertedDate.getTime() + 4 * 60 * 60 * 1000);
    
    return convertedDate;
    
  } else {
    throw new Error();
  }
};

export const isValidDate = (date) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;

  const [day, month, year] = date.split("/");
  const dayInt = parseInt(day, 10);
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt)) return false;
  if (yearInt < 1000 || yearInt > 9999) return false;
  if (monthInt < 1 || monthInt > 12) return false;

  const daysInMonth = [31, isLeapYear(yearInt) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (dayInt < 1 || dayInt > daysInMonth[monthInt - 1]) return false;

  return true;
};

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const isValidTime = (time) => {
  if (!/^\d{2}:\d{2}$/.test(time)) return false;

  const [hours, minutes] = time.split(":");
  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);

  if (isNaN(hoursInt) || isNaN(minutesInt)) return false;
  if (hoursInt < 0 || hoursInt > 23) return false;
  if (minutesInt < 0 || minutesInt > 59) return false;

  return true;
};



export const formDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};
export const formHour = (date) => {
  return format(new Date(date), "HH:mm");
}

export const formDateExt = (date) => {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getUTCDate()).padStart(2, '0'); 
  const month = String(formattedDate.getUTCMonth() + 1).padStart(2, '0');  
  const year = formattedDate.getUTCFullYear(); 
  const dateFormat = `${day}/${month}/${year}`;
  return dateFormat;
};
export const formHourExt = (date) => {
  const formattedDate = new Date(date);
  const time = `${String(formattedDate.getUTCHours()).padStart(2,'0')}:${String(formattedDate.getUTCMinutes()).padStart(2, '0')}`;
  return time
}


export const formatNormalDate = (date) => {
  const formattedDate = new Date(date);
  return `${formattedDate.getDate()} de ${formattedDate.toLocaleString("es", {
    month: "short",
  })}.`;
};

export const convertToLocalISOString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
