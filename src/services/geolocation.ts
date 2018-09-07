export const getCurrentPosition = (): Promise<Position> =>
  new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject();
    }
  });

export const watchPosition = (callback: (position: Position) => void) => {
  navigator.geolocation.watchPosition(callback);
};
