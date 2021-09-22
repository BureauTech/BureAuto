<template>
  <v-select
    outlined
    rounded
    color="bahama"
    @change="$emit('change', $event)"
    :value="value"
    v-bind="$attrs"
  />
</template>

<script src="./Select.js"></script>