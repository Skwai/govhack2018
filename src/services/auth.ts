import firebase, { User } from 'firebase';
import app from './firebase';

enum GoogleAuthScopes {
  EMAIL = 'https://www.googleapis.com/auth/userinfo.email'
}

const google = new firebase.auth.GoogleAuthProvider();
google.addScope([GoogleAuthScopes.EMAIL].join(','));

export const signIn = (): Promise<any> => app.auth().signInWithPopup(google);

export const signOut = (): Promise<any> => app.auth().signOut();

export const currentUser = (): User | null => app.auth().currentUser;

export const signInAnonymously = () => app.auth().signInAnonymously();

export const getCurrentUser = (): Promise<User | undefined> => {
  const authUser = currentUser();

  if (authUser) {
    return Promise.resolve(authUser);
  }

  return new Promise((resolve, reject) => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject('No authenticated user found');
      }
    });
  });
};
