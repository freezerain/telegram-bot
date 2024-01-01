// Import necessary modules for testing
import { assert } from 'chai';
import sinon from 'sinon';
import DiceThrow from '#src/action/actions/diceThrow.js';
import { TelegramApi } from '#main';

describe('Dice Throw', () => {

	afterEach(sinon.restore);

	const metadata = {
		env: { TELEGRAM_BOT_TOKEN: 0 },
		chat_id: 123,
		message_id: 456,
		msg: '🏀'
	};
	const CHAT_ACTION = 'choose_sticker';

	it('should send chat action, options, and finally a dice', async () => {
		const fakeSendMessage = sinon.fake.resolves();
		const fakeSendChatAction = sinon.fake.resolves();
		const fakeSendDice = sinon.fake.resolves();
		sinon.replace(TelegramApi.prototype, 'sendMessage', fakeSendMessage);
		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
		sinon.replace(TelegramApi.prototype, 'sendDice', fakeSendDice);

		await new DiceThrow().call(metadata);

		sinon.assert.calledOnceWithExactly(fakeSendMessage, {
			chat_id: metadata.chat_id,
			text: '🏀⚽🎲🎯🎳🎰',
			reply_to_message_id: metadata.message_id
		});
		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id, action: CHAT_ACTION
		});
		sinon.assert.calledOnceWithExactly(fakeSendDice, {
			chat_id: metadata.chat_id, emoji: metadata.msg,
			reply_to_message_id: metadata.message_id
		});
	});

	it('should handle API error and throw a custom error', async () => {
		const fakeSendMessage = sinon.fake.resolves();
		const fakeSendChatAction = sinon.fake.rejects();
		const fakeSendDice = sinon.fake.resolves();
		sinon.replace(TelegramApi.prototype, 'sendMessage', fakeSendMessage);
		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
		sinon.replace(TelegramApi.prototype, 'sendDice', fakeSendDice);

		await new DiceThrow().call(metadata).then(() => {
			assert.fail('should not be called');
		}).catch( e => {
			assert.equal(e.message, 'api fail');
		})

		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id, action: CHAT_ACTION
		});
		sinon.assert.notCalled(fakeSendMessage);
		sinon.assert.notCalled(fakeSendDice);
	});
});
