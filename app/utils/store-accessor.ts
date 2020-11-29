import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import exchangeStore from '../store/exchange'

// eslint-disable-next-line import/no-mutable-exports
let exchanges: exchangeStore

function initialiseStores(pStore: Store<any>): void {
  exchanges = getModule(exchangeStore, pStore)
}

export { initialiseStores, exchanges }
