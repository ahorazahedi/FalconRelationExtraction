import { createStore } from 'redux';
import { MainStore } from './reducer';

export const store = createStore(MainStore);

