
export const addMonthesToUTCDate = (utcDate: Date, month: number) => {
    const dateObject = new Date(utcDate);
    const currentMonth = dateObject.getUTCMonth();
    dateObject.setUTCMonth(currentMonth + month);
  
    return dateObject;
};
  
