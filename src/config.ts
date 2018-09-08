export const FIREBASE = {
  apiKey: 'AIzaSyCB8nzNb8FsAWu7SQBOeq_TAN0PN_nctjw',
  authDomain: 'govhack2018.firebaseapp.com',
  databaseURL: 'https://govhack2018.firebaseio.com',
  projectId: 'govhack2018',
  storageBucket: 'govhack2018.appspot.com',
  messagingSenderId: '821973521357'
};

export const SPAWN_COOLDOWN_DURATION_MINUTES = 10;

export const MAP_STYLE: any = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      {
        saturation: '32'
      },
      {
        lightness: '-3'
      },
      {
        visibility: 'on'
      },
      {
        weight: '1.18'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [
      {
        saturation: '-70'
      },
      {
        lightness: '14'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        saturation: '100'
      },
      {
        lightness: '-14'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      },
      {
        lightness: '12'
      }
    ]
  }
];
