<template>
  <v-col cols="12">
    <p
      :class="`${isValid ? 'bahama--text' : 'red--text'} text-body-1 d-block text-left mb-1`"
      v-text="text"
    />

  </v-col>
</template>

<script src="./ColoredValidation.js"></script>