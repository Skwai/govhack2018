export const FIREBASE = {
  apiKey: 'AIzaSyCB8nzNb8FsAWu7SQBOeq_TAN0PN_nctjw',
  authDomain: 'govhack2018.firebaseapp.com',
  databaseURL: 'https://govhack2018.firebaseio.com',
  projectId: 'govhack2018',
  storageBucket: 'govhack2018.appspot.com',
  messagingSenderId: '821973521357'
};

export const SPAWN_COOLDOWN_DURATION_MINUTES = 10;

export const MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: 'administrative',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.highway',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#84afa3'
      },
      {
        lightness: 52
      }
    ]
  },
  {
    stylers: [
      {
        saturation: -17
      },
      {
        gamma: 0.36
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3f518c'
      }
    ]
  }
];