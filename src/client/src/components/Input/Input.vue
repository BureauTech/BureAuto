<template>
  <v-text-field
    outlined
    rounded
    :rules="propsRules"
    :placeholder="placeholder"
    color="bahama"
    @input="$emit('input', $event)"
    :value="value"
  />
</template>

<script src="./Input.js"></script>