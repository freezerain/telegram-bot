export default class DBRepo {
	constructor(DB) {
		this.db = DB;
	}

	getLastGames(chatId) {
		return this.db
			.prepare('SELECT * FROM epicgames WHERE chatid = ?1 ORDER BY id DESC LIMIT 1;')
			.bind(chatId)
			.first('games')
			.then(resp => {
				return JSON.parse(resp) ?? []
			})
			.catch(e => {
				throw new Error('db fail', { cause: e });
			});
	}

	addLastGames(chatId, games) {
		if (games.length < 1) return;
		return this.db
			.prepare('INSERT INTO epicgames (chatid, games) VALUES (?1, ?2)')
			.bind(chatId, JSON.stringify(games))
			.run()
			.catch(e => {
				throw new Error('db fail', { cause: e });
			});
	}
}
