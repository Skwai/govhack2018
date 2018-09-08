export interface ILatLng {
  lat: number;
  lng: number;
}

export default class GeolocationState {
  coords: ILatLng = { lat: -42.87936, lng: 147.32941 };
}
