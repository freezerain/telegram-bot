import { crons, strings } from '#res';
import { TelegramApi } from '#main';
import morningRoutine from './scheduled/morningRoutine.js';
import noonRoutine from './scheduled/noonRoutine.js';
import eveningRoutine from './scheduled/eveningRoutine.js';

export default {

	minute: {
		cron: crons.everyMinute,
		action: (metadata) => {
			return morningRoutine(metadata);
		}
	},

	morning: {
		cron: crons.everyMorning,
		action: (metadata) => {
			return morningRoutine(metadata);
		}
	},

	noon: {
		cron: crons.everyNoon,
		action: (metadata) => {
			return noonRoutine(metadata);
		}
	},

	evening: {
		cron: crons.everyEvening,
		action: (metadata) => {
			return eveningRoutine(metadata);
		}
	}
};
