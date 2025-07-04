const currentTime = Date.now();
export const countDown = (futureTime) => {
  const now = Date.now();
  const target = new Date(futureTime).getTime();
  let diff = Math.floor((target - now) / 1000);
  if (diff <= 0) return "倒计时结束";
  const days = Math.floor(diff / (60 * 60 * 24));
  diff %= 60 * 60 * 24;
  const hours = Math.floor(diff / (60 * 60));
  diff %= 60 * 60;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(days)} days, ${pad(hours)} hours, ${pad(minutes)}m, ${pad(
    seconds
  )}s`;
};
