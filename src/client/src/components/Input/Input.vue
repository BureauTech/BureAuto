<template>
  <v-text-field
    outlined
    rounded
    :rules="propsRules"
    :placeholder="placeholder"
    color="bahama"
    @change="teste"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>

<script src="./Input.js"></script>