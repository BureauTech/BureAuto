<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-bind="$attrs"
      >
        <v-card
          elevation="1"
          :class="round"
          align="center"
          justify="center"
          :loading="loading"
          :color="colorCard"
        >
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./Card.js"></script>