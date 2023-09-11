import { addMonthesToUTCDate } from "./AddSubDate";

export const calcSumAndDate = (duration: string,time: Date, price: number) => {
    const data = {
        sum: 0,
        newSubDate: new Date()
    };
    if(duration === "1"){
        data.sum = price;
        data.newSubDate = addMonthesToUTCDate(time, 1);
        return data;
    }
    if(duration === "6"){
        data.sum = Math.floor((price * 6 - (price * 6) * 15/100) / 1000) * 1000;
        data.newSubDate = addMonthesToUTCDate(time, 6);
        return data;
    }
    if(duration === "12"){
        data.sum = Math.floor((price * 12 - (price * 12) * 35/100) / 1000) * 1000;
        data.newSubDate = addMonthesToUTCDate(time, 12);
        return data;
    }

};