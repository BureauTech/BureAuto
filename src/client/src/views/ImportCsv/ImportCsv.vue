<template>
  <Card
    :roundLevel="0"
    class="Card"
    colorCard="transparent"
    sm="10"
    xs="12"
  >
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
            @change="attachFile"
          />
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
          <Button
            buttonText="Importar"
            min-width="100%"
            @click="importData"
          />
        </v-col>
      </v-row>
    </Card>
    <v-row>
      <v-col>
        <v-img
          src="@/assets/board-image.png"
          max-height="300"
          max-width="400"
          aspect-ratio="1"
          contain
        />
        <v-col
          lg="4"
          xl="3"
          sm="6"
          cols="9"
        >
          <p
            class="p-info text-h5 font-weight-medium"
            v-text="`Você não possui ${textView} no momento`"
            key="textView"
          ></p>
        </v-col>
      </v-col>
    </v-row>
  </Card>
</template>

<script src="./ImportCsv.js" scoped></script>

<style src="./ImportCsv.css"></style>