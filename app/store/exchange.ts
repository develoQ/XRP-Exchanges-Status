import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { EXCHANGES, ExchangeType } from './exchangeData'

const apiBaseUrl = 'https://data.ripple.com/'
enum FlagType {
  RequireDest = 1,
  RequireAuth = 2,
  DisallowXRP = 3,
  DisableMaster = 4,
  AccountTxnID = 5,
  NoFreeze = 6,
  GlobalFreeze = 7,
  DefaultRipple = 8,
  DepositAuth = 9,
}

type exchangeDataType = {
  flag: FlagType[]
} & ExchangeType

interface transactionType {
  hash: string
  // eslint-disable-next-line camelcase
  ledger_index: number
  date: string
  tx: {
    TransactionType: string
    Flags: number
    Sequence: number
    SetFlag: number
    Fee: string
    SigningPubKey: string
    TxnSignature: string
    Account: string
  }
  meta: any
}

interface responseExchangeTransactionHistory {
  result: string
  count: number
  transactions?: transactionType[]
}

@Module({
  name: 'exchange',
  stateFactory: true,
  namespaced: true,
})
class exchange extends VuexModule {
  exchangeData: exchangeDataType[] = []

  @Mutation
  appendExchangeData(data: exchangeDataType) {
    this.exchangeData.push(data)
  }

  @Action({ rawError: true })
  async fetchExchangesData() {
    let flags: FlagType[] = []
    for (const exchange of EXCHANGES) {
      const response: responseExchangeTransactionHistory = await $axios.$get(
        apiBaseUrl + 'v2/accounts/' + exchange.address + '/transactions',
        {
          params: { type: 'AccountSet', result: 'tesSUCCESS' },
        }
      )
      if (response.count > 0) {
        flags = response.transactions?.map((tx) => {
          return tx.tx.SetFlag as FlagType
        })!
      } else {
        flags = []
      }
      this.appendExchangeData({
        ...exchange,
        flag: flags,
      })
    }
  }

  get getExchangeData() {
    return this.exchangeData
  }
}

export default exchange
