import scheduledMap from './scheduledMap.js';

const TAG = 'scheduledRouter';

export default function get(metadata) {
	return Object.values(scheduledMap)
		.find((e)=> e.cron.includes(metadata.cron))
		?.action(metadata) ?? (() => {throw new Error(`scheduled routine not found: ${metadata.cron}`)})();
}
