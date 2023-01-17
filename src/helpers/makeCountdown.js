import makeStringPadded from "./makestringPadded";

const makeCountdown = (ms) => {
  if (ms < 0) {
    ms = 0;
  }
  const days = Math.floor(ms / (1000 * 3600 * 24));
  const hours = Math.floor((ms % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((ms % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return {
    days: makeStringPadded(days),
    hours: makeStringPadded(hours),
    minutes: makeStringPadded(minutes),
    seconds: makeStringPadded(seconds),
  };
};

export default makeCountdown;
