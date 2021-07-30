const days = ["일", "월", "화", "수", "목", "금", "토"];
export const yyyymmdd = (dateObj) => {
   const year = dateObj.getFullYear();
   const month = dateObj.getMonth() + 1;
   const date = dateObj.getDate();
   const day = dateObj.getDay();
   return `${year}/${month <= 9 ? `0${month}` : month}/${
      date <= 9 ? `0${date}` : date
   }    ${days[day]}`;
};

export const hhmm = (dateObj) => {
   const hour = dateObj.getHours();
   const minute = dateObj.getMinutes();
   return `${hour <= 9 ? `0${hour}` : hour}: ${
      minute <= 9 ? `0${minute}` : minute
   }`;
};
