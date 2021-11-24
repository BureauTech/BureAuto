<template>
  <Card
    :roundLevel="0"
    class="Card "
    colorCard="transparent"
  >
    <v-row class="my-2 px-10 justify-center align-center">
      <v-col
        cols="12"
        sm="7"
      >
        <v-file-input
          label="Clique aqui para selecionar o arquivo..."
          outlined
          rounded
          dense
          class="centered-input-text"
          prepend-icon=""
          @change="selectFile"
          ref="csv"
          accept=".csv"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
      >
        <Button
          min-width="100%"
          @click="importFile"
        >
          Importar
        </Button>
      </v-col>
    </v-row>
  </Card>
</template>

<script src="./ImportCsv.js" scoped></script>

<style src="./ImportCsv.css"></style>