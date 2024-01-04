import cloudflareScheduledHandler from '#src/data/cloudflareScheduledHandler.js';
import {crons} from '#res';

export default function test(metadata){
	if(metadata.msg.includes('morning')){
		return cloudflareScheduledHandler({
			cron: crons.everyMorning[0],
		}, metadata.env);
	}else{
		throw new Error('test action not implemented');
	}
}
