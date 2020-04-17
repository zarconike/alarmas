// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // alarmsApi: 'http://23.96.60.108/api/Alarm/',
  alarmsApi: 'http://23.101.154.195/api/Alarm/',
  userApi: 'http://104.209.214.53/api/User/',
  usageCounterApi:'http://webcloud.satrack.com/NwIndicadorUso/api/IndicadorUso/IngresarAuditoriaContadores',
  allowedCountries: [1]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
