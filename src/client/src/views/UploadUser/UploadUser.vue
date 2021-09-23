<template>
  <Card
    :roundLevel="0"
    class="Card"
    colorCard="transparent"
    sm="10"
    xs="12"
  >
    <ImportCsv
      @selectFile="attachFile"
      @importFile="importData"
    />
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
            v-text="`Você não possui usuários no momento`"
          ></p>
        </v-col>
      </v-col>
    </v-row>
  </Card>
</template>

<script src="./UploadUser.js" scoped></script>

<style src="./UploadUser.css"></style>