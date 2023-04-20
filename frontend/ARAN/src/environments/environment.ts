// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001',
  apiMessengerUrl:'http://localhost:3001',

  // ESTADOS PARA OT
  ESTADO_ESPERA: 'espera',// estado de una nueva OT
  ESTADO_RETIRAR: 'retirado', // Trabajo retirado por el cliente
  ESTADO_FINALIZADO: 'finalizado', // Trabajo finalizado
  ESTADO_PROCESO: 'proceso', // Trabajo en proceso

  // ESTADOS TARJETAS
  TARJETA_NO_ASIGNADA: 'no_asignada', // cuando no se carga numero de tarjeta a una OT
  TARJETA_LIBRE: 'libre', // Tarjeta libre para su uso

  // ACCIONES PARA ESTADOS
  ACCION_NUEVA: 'nueva', // accion nueva de evento mqtt
  ACCION_EN_USO: 'en_uso', // accion retirar de evento mqtt


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
