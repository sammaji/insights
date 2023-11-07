export const formatTime = (time: number) => {
  let timeSec = Math.round(time / 1000);
  let timeHour = Math.floor(timeSec / 3600);
  let timeLeftMin = Math.floor((timeSec - timeHour * 3600) / 60);
  let timeLeftSec = timeSec - timeLeftMin * 60;

  let formattedTime: string = "";
  if (timeHour > 0) {
    formattedTime =
      timeLeftMin > 0 ? `${timeHour}h${timeLeftMin}m` : `${timeHour}h`;
  } else {
    formattedTime =
      timeLeftMin > 0 ? `${timeLeftMin}m${timeLeftSec}s` : `${timeLeftSec}s`;
  }

  return formattedTime;
};
