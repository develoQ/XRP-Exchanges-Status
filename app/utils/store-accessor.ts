import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import exchange from '../store/exchange'

// eslint-disable-next-line import/no-mutable-exports
let exchanges: exchange

function initialiseStores(pStore: Store<any>): void {
  exchanges = getModule(exchange, pStore)
}

export { initialiseStores, exchanges }
