<template>
  <v-btn
    elevation="2"
    rounded
    v-text="buttonText"
    color="bahama"
    class="white--text text-none text-h5"
    v-bind="$attrs"
    @click="emit"
  ></v-btn>
</template>

<script src="./Button.js"></script>

<style>
</style>