'use strict';

/**
 * @ngdoc service
 * @name toDoApp.appConstants
 * @description
 * # appConstants
 * Constant in the toDoApp.
 */
angular.module('toDoApp')
	.constant('TODO_STATUS', [{
		code: 'OP',
		description: 'Opened'
	}, {
		code: 'BL',
		description: 'Blocked'
	}, {
		code: 'LA',
		description: 'Late'
	}, {
		code: 'FS',
		description: 'Finished'
	}])
	.constant('TODO_PRIORITY', [{
		code: 'LO',
		description: 'Low'
	}, {
		code: 'MD',
		description: 'Medium'
	}, {
		code: 'HI',
		description: 'High'
	}, {
		code: 'AS',
		description: 'ASAP'
	}])
	.constant('TODO_PROJECT', [{
		code: 'GEN',
		description: 'General'
	}, {
		code: 'ARQ',
		description: 'ARQFIS-web'
	}, {
		code: 'ARQ1',
		description: 'ARQFIS-ETL-RUJ'
	}, {
		code: 'ARQ2',
		description: 'ARQFIS-ETL-EXPURGO'
	}, {
		code: 'ARQ3',
		description: 'ARQFIS-ETL-MIGRACION'
	}]);