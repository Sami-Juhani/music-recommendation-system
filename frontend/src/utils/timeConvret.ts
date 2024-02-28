const msToMinutesAndSeconds = (ms: number): string => {
    let minutes: number = Math.floor(ms / 60000);
    let seconds: number = parseInt(((ms % 60000) / 1000).toFixed(0));
    let result: string = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds;
    return result;
  };
export default msToMinutesAndSeconds;