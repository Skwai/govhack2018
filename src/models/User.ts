import { firestore } from 'firebase';

type UserProperties = Partial<User>;

export default class User {
  id?: string;
  username: string = '';
  updated: firebase.firestore.Timestamp = firestore.Timestamp.fromDate(new Date());
  coordinates?: firestore.GeoPoint;

  constructor(props?: UserProperties) {
    Object.assign(this, props);
  }
}
