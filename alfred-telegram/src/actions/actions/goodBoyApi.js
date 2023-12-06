import { log, loge, Api, TelegramRepo } from '../../main.mjs'

const GOOD_BOY_BASE_URL = 'https://dog.ceo/api'
const GOOD_BOY_ENDPOINT = 'breeds/image/random'

export default function call(metadata){
  log('Calling goodBoyApi')
  return new Api(GOOD_BOY_BASE_URL)
  						.fetchData(GOOD_BOY_ENDPOINT)
  						.then(resp => {
  							log('goodBoyApi response', resp)
  							return resp
  						})
  						.then(resp => {
  							return new TelegramRepo(metadata.env)
  													.sendPhoto(metadata.chat_id, resp.message, '🐶🐶🐶')
  						})
  						.then(resp => {
  							log('goodBoyApi success')
  							return resp
  						})
  						.catch(e => {
  							loge('goodBoyApi error', e.message)
  							throw e
  						})
}
