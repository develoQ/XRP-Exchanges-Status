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
        <v-card-subtitle>{{ exchange.address }}</v-card-subtitle>
        <v-card-text>
          <v-container class="pb-0">
            <v-row>
              <v-col class="py-2"> 入庫タグ必須 </v-col>
              <v-col class="py-2">
                <v-icon v-if="exchange.flag.includes(1)" color="success">
                  mdi-check-bold
                </v-icon>
                <v-icon v-else color="error">mdi-alert</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-2"> マスターキー無効化 </v-col>
              <v-col class="py-2">
                <v-icon v-if="exchange.flag.includes(4)" color="success">
                  mdi-check-bold
                </v-icon>
                <v-icon v-else color="error">mdi-alert</v-icon>
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
@Component({
  async asyncData() {
    if (exchanges.getExchangeData.length === 0) {
      await exchanges.fetchExchangesData()
    }
  },
})
export default class extends Vue {
  get exchanges() {
    return exchanges.exchangeData
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
