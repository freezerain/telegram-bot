import { config } from '#res';

export default class DBRepo {
	constructor(DB) {
		this.db = DB;
	}

	getLastGames(chatId) {
		return this.db
			.prepare('SELECT * FROM ?1 WHERE chatid = ?2 ORDER BY id DESC LIMIT 1;')
			.bind(config.epicTableName, chatId)
			.first('games')
			.then(resp => {
				return JSON.parse(resp) ?? [];
			})
			.catch(e => {
				throw new Error('db fail', { cause: e });
			});
	}

	addLastGames(chatId, games) {
		if (games.length < 1) return;
		return this.db
			.prepare('INSERT INTO ?1 (chatid, games) VALUES (?2, ?3)')
			.bind(config.epicTableName, chatId, JSON.stringify(games))
			.run()
			.catch(e => {
				throw new Error('db fail', { cause: e });
			});
	}
}
