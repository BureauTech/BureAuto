<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        align="left"
      >
        Desempenho dos Anúncios
      </v-col>
    </v-row>
    <v-row justify="center">
      <ReportCard
        title="Engajamento da plataforma"
        :content="platform"
        v-if="is_admin"
      />
      <ReportCard
        title="Engajamento dos anúncios favoritos"
        :content="favorite"
      />
      <ReportCard
        title="Engajamento dos anúncios"
        :content="advertisement"
      />
    </v-row>
  </v-container>
</template>

<script src="./Reports.js"></script>