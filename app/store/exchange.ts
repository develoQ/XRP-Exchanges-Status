import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { EXCHANGES, ExchangeType } from './exchangeData'

const apiBaseUrl = 'https://data.ripple.com/'
export enum FlagType {
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

export type exchangeDataType = {
  flag: Array<{ type: FlagType; date: string }>
  activated: string
} & ExchangeType

interface accountDataType {
  address: string
  parent: string
  // eslint-disable-next-line camelcase
  initial_balance: string
  inception: string
  // eslint-disable-next-line camelcase
  ledger_index: number
  // eslint-disable-next-line camelcase
  tx_hash: string
}

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

interface responseAccount {
  result: string
  // eslint-disable-next-line camelcase
  account_data: accountDataType
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
export default class exchange extends VuexModule {
  exchangeData: exchangeDataType[] = []

  @Mutation
  appendExchangeData(data: exchangeDataType) {
    this.exchangeData.push(data)
  }

  @Action({ rawError: true })
  async fetchExchangesData() {
    let flags: Array<{ type: FlagType; date: string }> = []
    for (const exchange of EXCHANGES) {
      const responseAccountData: responseAccount = await $axios.$get(
        apiBaseUrl + 'v2/accounts/' + exchange.address
      )

      const responseTxHistory: responseExchangeTransactionHistory = await $axios.$get(
        apiBaseUrl + 'v2/accounts/' + exchange.address + '/transactions',
        {
          params: { type: 'AccountSet', result: 'tesSUCCESS' },
        }
      )
      if (responseTxHistory.count > 0) {
        flags = responseTxHistory.transactions?.map((tx) => {
          return {
            type: tx.tx.SetFlag as FlagType,
            date: tx.date.split('T')[0],
          }
        })!
      } else {
        flags = []
      }
      this.appendExchangeData({
        ...exchange,
        flag: flags,
        activated: responseAccountData.account_data.inception.split('T')[0],
      })
    }
  }

  get getExchangeData() {
    return this.exchangeData
  }
}
