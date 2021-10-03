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
    <v-row v-if="advertisements.length == 0">
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
            v-text="`Você não possui anúncios no momento`"
          ></p>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Card
          :roundLevel="0"
          class="Card"
          colorCard="transparent"
          sm="10"
          xs="12"
        >
          <template>
            <v-data-table
              :headers="headers"
              :items="advertisements"
              sort-by="adv_model_description"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Lista de Anúncios</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:item.edit="{ item }">
                <v-btn
                  small
                  @click="Edit(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.show="{ item }">
                <v-btn
                  small
                  @click="Show(item)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.editStatus="{ item }">
                <v-btn
                  small
                  @click="EditStatus(item)"
                >
                  <v-icon>mdi-autorenew</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </Card>
      </v-col>
    </v-row>
  </Card>
</template>

<script src="./UploadAdvertisement.js" scoped></script>

<style src="./UploadAdvertisement.css"></style>