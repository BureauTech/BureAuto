<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        xl="4"
      >
        <v-card
          elevation="1"
          class="mx-auto my-12 rounded-xl"
          align="center"
          justify="center"
          :loading="loading"
        >
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./Card.js"></script>