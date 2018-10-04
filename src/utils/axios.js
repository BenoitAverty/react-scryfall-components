import axios from 'axios';
import LRUCache from 'lru-cache';
import { cacheAdapterEnhancer } from 'axios-extensions';

const instance = axios.create({
  baseURL: 'https://api.scryfall.com',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    defaultCache: new LRUCache({ maxAge: 24 * 3600 * 1000, size: 1500 }),
  }),
});

export default instance;
