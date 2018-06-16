import { initialState } from './store/selectors.js';
import { hostAddress } from './store/selectors.js';

/*
 * Actually, redux state is gone when you refresh page.
 * This need to keep our state against refreshing page.
 * This stores state in local storage.
 * TODO: when user log out, the local storage must be removed.
 *
 */
class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem(hostAddress + ":state");//TODO: this should be replaced with localhost:8000

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem(hostAddress + ":state", serializedState);

        }
        catch (err) {
        }
    }

    initializeState() {
        return initialState
    }
}

export default StateLoader;
