<template>
  <v-text-field
    outlined
    rounded
    color="bahama"
    @input="$emit('input', $event)"
    :value="value"
    v-bind="$attrs"
  />
</template>

<script src="./Input.js"></script>