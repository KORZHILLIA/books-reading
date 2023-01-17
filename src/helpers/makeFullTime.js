import makeStringPadded from "./makestringPadded";

const makeFullTime = (string) => {
  const today = new Date();
  const hours = makeStringPadded(today.getHours());
  const mins = makeStringPadded(today.getMinutes());
  const secs = makeStringPadded(today.getSeconds());
  const time = hours + ":" + mins + ":" + secs;
  return `${string} ${time}`;
};

export default makeFullTime;
