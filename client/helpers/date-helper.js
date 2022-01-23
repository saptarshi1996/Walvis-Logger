export default {

  calculateDateTimeFromTime(time) { 
    // get until and since.
    const dateTime = new Date();
    const [ hours, mins ] = time.split(":");
    dateTime.setHours(hours);
    dateTime.setMinutes(mins);
    dateTime.setSeconds(0);
    return Math.floor((dateTime).getTime() / 1000);
  },

};
