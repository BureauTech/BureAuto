<template>
  <v-app>
    <v-app-bar
      color="transparent"
      elevation="0"
      justify
    >
      <v-layout
        align-center
        justify-sm
      >
        <v-col
          max-width="10%"
          cols="16"
          align="left"
        >
          Mais recentes:
        </v-col>
      </v-layout>
    </v-app-bar>
    <v-layout
      row
      justify-center
      align-center
      class="no-negative"
    >
      <v-col
        v-for="ad in ads"
        :key="ad.adv_cod"
        cols="4"
        align="center"
      >
        <v-card
          min-width="100%"
          rounded="xl"
        >
          <v-card-title>
            {{ad.adv_model_description}}
          </v-card-title>
          <v-img
            src="@/assets/bureauto_sem_fundo.png"
            alt="Logo da bureAuto"
            max-height="200"
            max-width="200"
          />
          <v-card-text>
          a partir de R$ {{ad.adv_value}}
          </v-card-text>
          <v-btn
            elevation="0"
            color="transparent"
            small
          >
            + informações
          </v-btn>
        </v-card>
      </v-col>
    </v-layout>
  </v-app>
</template>

<script src="./Home.js"></script>
<style src="./Home.css"></style>