<template>
  <v-col
    cols="12"
    sm="10"
    md="6"
    align="center"
  >
    <v-card
      min-width="100%"
      rounded="xl"
      v-bind="$attrs"
    >
      <v-card-title>
        <h3 v-text="title" class="bk-word"></h3>
      </v-card-title>
      <v-card-text
        v-for="(item, index) in content"
        :key="index"
        class="black--text py-1"
      >
        <p class="text-body-1 bk-word">{{item.text}}<b>{{item.value}}</b> </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script src="./ReportCard.js"></script>