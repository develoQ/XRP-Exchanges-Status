<template>
  <v-row justify="center" align="center">
    <v-col
      v-for="exchange in exchanges"
      :key="exchange.address"
      cols="12"
      sm="8"
      md="6"
      lg="4"
    >
      <v-card class="ma-3">
        <v-card-title>
          {{ exchange.name }}
          <v-spacer />
          <v-btn icon :href="webLink(exchange.url)">
            <v-icon>mdi-web</v-icon>
          </v-btn>
          <v-btn icon :href="twitterLink(exchange.twitter)">
            <v-icon color="accent">mdi-twitter</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle class="py-1">{{ exchange.address }}</v-card-subtitle>
        <v-card-subtitle class="py-1">
          Activated: {{ exchange.activated }}
        </v-card-subtitle>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="6" class="py-2"> 入庫タグ必須 </v-col>
              <v-spacer />
              <v-col cols="2" class="py-2">
                <v-icon
                  v-if="existsFlag(exchange, FlagTypeRequireDest)"
                  color="success"
                >
                  mdi-check-bold
                </v-icon>
                <v-icon v-else color="error">mdi-alert</v-icon>
              </v-col>
              <v-col cols="4" class="text-center">
                {{ typeActivatedDate(exchange, FlagTypeRequireDest) }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="py-2"> マスターキー無効化 </v-col>
              <v-col cols="2" class="py-2">
                <v-icon
                  v-if="existsFlag(exchange, FlagTypeDisableMaster)"
                  color="success"
                >
                  mdi-check-bold
                </v-icon>
                <v-icon v-else color="error">mdi-alert</v-icon>
              </v-col>
              <v-col cols="4" class="text-center">
                {{ typeActivatedDate(exchange, FlagTypeDisableMaster) }}
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { exchanges } from '../store/index'
import { exchangeDataType, FlagType } from '../store/exchange'

@Component({
  async asyncData() {
    console.log(exchanges.getExchangeData)
    if (exchanges.getExchangeData.length === 0) {
      await exchanges.fetchExchangesData()
    }
  },
})
export default class extends Vue {
  get exchanges() {
    return exchanges.exchangeData
  }

  get existsFlag() {
    return (ex: exchangeDataType, flag: FlagType) => {
      return ex.flag.find((a) => {
        return a.type === flag
      })
    }
  }

  get FlagTypeRequireDest() {
    return FlagType.RequireDest
  }

  get FlagTypeDisableMaster() {
    return FlagType.DisableMaster
  }

  get typeActivatedDate() {
    return (ex: exchangeDataType, flag: FlagType) => {
      const filterd = ex.flag.filter((a) => {
        return a.type === flag
      })
      console.log(filterd)
      if (filterd.length === 0) {
        return '-'
      } else {
        return filterd[0].date
      }
    }
  }

  get webLink() {
    return (url: string) => {
      return url
    }
  }

  get twitterLink() {
    return (link: string) => {
      return 'https://twitter.com/' + link
    }
  }
}
</script>
