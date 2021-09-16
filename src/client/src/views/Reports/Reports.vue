<template>
  <v-app>
    <v-col
      max-width="10%"
      cols="16"
      align="left"
    >
      Desempenho dos Anúncios
    </v-col>
    <v-layout
      row
      justify-center
      align-top
      class="no-negative"
    >
      <v-col
        v-for="ad in 4"
        :key="ad"
        cols="6"
        align="center"
      >
        <v-card
          min-width="100%"
          rounded="xl"
        >
          <v-card-title>
            <h3>Engajamento geral dos anúncios</h3>
          </v-card-title>
          <v-card-text>
            <p class="text-body-1">N. de visualizações do anúncio:<b> 300</b> </p>
          </v-card-text>
          <v-card-text>
            <p class="text-body-1">N. de pessoas que entraram em contato:<b> 20</b></p>
          </v-card-text>
          <v-card-text>
            <p class="text-body-1">Percentual de engajamento do anúncio: <b>6,67%</b></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-app>
</template>