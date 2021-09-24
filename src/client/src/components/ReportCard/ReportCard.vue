<template>
  <v-col
    cols="6"
    align="center"
  >
    <v-card
      min-width="100%"
      rounded="xl"
    >
      <v-card-title>
        <h3 v-text="title"></h3>
      </v-card-title>
      <v-card-text v-for="(item, index) in content" :key="index">
        <p class="text-body-1">{{item.text}}<b>{{item.value}}</b> </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script src="./ReportCard.js"></script>
<style></style>