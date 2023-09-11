import * as schedule from "node-schedule";
import { Parent } from "../models/Parent";

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = "Etc/UTC";

const checkSubDate = async() => {
    try {
        const AllParent = await Parent.findAll({
            where: {isActive: true },
        });
        AllParent.forEach(async(parent) => {
            const date = new Date(Date.now());
            if(parent.subscriptionEndDate < date){
                await Parent.update(
                    { isActive: false},
                    { 
                        where: {id: parent.id },
                        returning: true 
                    }).then((result) => { 
                    return result[1][0];
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
   
};
const job = schedule.scheduleJob(rule, function(){
    checkSubDate();
});

export default job;
