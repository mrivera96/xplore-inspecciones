// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'http://localhost/inspApi/api',
  //apiUrl: 'http://inspApi.test/api',
  cryptKey: '0436b7ac-c152-4839-b054-f5852e06bc02',
  //imagesUrl: 'http://inspApi.test'
  imagesUrl: 'http://localhost/inspApi'
  //CAPACITOR_ANDROID_STUDIO_PATH: '/snap/android-studio/current/bin/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
