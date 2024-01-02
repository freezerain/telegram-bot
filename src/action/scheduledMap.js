import { crons, strings } from '#res';
import { TelegramApi } from '#main';
import morningRoutine from './scheduled/morningRoutine.js';
export default {

	minute: {
		cron: crons.everyMinute,
		action: (metadata) => {
			return morningRoutine(metadata)
		}
	},

	morning: {
		cron: crons.everyMorning,
		action: (metadata) => {
			return morningRoutine(metadata)
		}
	},

	noon: {
		cron: crons.everyNoon,
		action: (metadata) => {
			return morningRoutine(metadata)
		}
	},

	evening: {
		cron: crons.everyEvening,
		action: (metadata) => {
			return morningRoutine(metadata)
		}
	}
};
