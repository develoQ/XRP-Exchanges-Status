export type ExchangeType = {
  name: string
  address: string
  url?: string
  twitter?: string
}

export const EXCHANGES: ExchangeType[] = [
  {
    name: 'SBI VC Trade',
    address: 'rKcVYzVK1f4PhRFjLhWP7QmteG5FpPgRub',
    url: '	https://www.sbivc.co.jp',
    twitter: 'sbivc_official',
  },
  {
    name: 'GMO Coin',
    address: 'rav4ti22NyMgD1WbGKoRy62hUL75dq8w4u',
    url: 'https://coin.z.com/jp/',
    twitter: 'gmo_coin',
  },
  {
    name: 'bitFlyer',
    address: 'rpY7bZBkA98P8zds5LdBktAKj9ifekPdkE',
    url: 'https://bitflyer.com',
    twitter: 'bitFlyer',
  },
  {
    name: 'CoinCheck',
    address: 'rNQEMJA4PsoSrZRn9J6RajAYhcDzzhf8ok',
    url: 'https://coincheck.com',
    twitter: 'coincheckjp',
  },
  {
    name: 'DMM Bitcoin',
    address: 'rQHoYXU12UhnsYDW7dQdVPKTbDLENJnVQr',
    url: 'https://bitcoin.dmm.com',
    twitter: 'DMM_Bitcoin',
  },
  {
    name: 'bitbank',
    address: 'rw7m3CtVHwGSdhFjV4MyJozmZJv3DYQnsA',
    url: 'https://bitbank.cc',
    twitter: 'bitbank_inc',
  },
  {
    name: 'DeCurret',
    address: 'rswHhsqEiSoxQ4ZMh2DGNJGueiR23mkf37',
    url: 'https://decurret.com',
    twitter: 'DeCurret',
  },
  {
    name: 'BITMAX',
    address: 'rBZF2XNtEHnDFbv3dr6U7GCUz9UGputrnu',
    url: '	https://www.bitmax.me',
    twitter: 'BITMAX_JP',
  },
  {
    name: 'Liquid by Quoine',
    address: 'rENMoQvSHtb8sZwsxfefSGNZ7RQ89pd93H',
    url: 'https://liquid.com',
    twitter: 'liquid_global',
  },
]
