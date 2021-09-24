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
      <ReportCard title="Engajamento geral dos anúncios" :content="engagement" />
      <ReportCard title="Engajamento dos anúncios favoritos" :content="favorite" />
    </v-layout>
  </v-app>
</template>

<script src="./Reports.js"></script>