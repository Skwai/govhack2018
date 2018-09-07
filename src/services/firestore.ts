import app from './firebase';

const db = app.firestore();

db.settings({
  timestampsInSnapshots: true
});

export default db;
