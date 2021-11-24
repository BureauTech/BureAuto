<template>
  <v-container>
    <v-row>
      <v-app-bar
        color="transparent"
        elevation="0"
        justify
      >
        <v-layout>
          <v-col cols="12">
            <h3>
              Favoritos
            </h3>
            Seus anúncios favoritos
          </v-col>
        </v-layout>
      </v-app-bar>
    </v-row>
    <v-row
      justify="center"
      justify-lg="start"
    >
        <v-col
          cols="12"
          sm="10"
          lg="6"
          v-for="(ad, index) in ads"
      :key="ad.adv_cod"
        >
      <v-card
        min-width="100%"
        rounded="xl"
        align-center
        class="text-center margin-layout"
      >
        <v-col>
        <v-card-title>
          <v-row
            no-gutters
            justify="end"
          >
            <v-col
              align="right"
              cols="auto"
              v-text="ad.adv_model_description + ' - ' + ad.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
            >
            </v-col>
            <v-col
              align="right"
              cols="1"
              class="mx-2"
            >
              <v-icon
                large
                @click="viewAdvertisement(ad.adv_cod)"
              >
                mdi-eye
              </v-icon>
            </v-col>
            <v-col
              align="right"
              cols="1"
              class="mx-2"
            >
              <v-icon
                large
                @click="deleteFav(ad.adv_cod, index)"
              >
                mdi-trash-can-outline
              </v-icon>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="7"
            align="center"
            justify="center"
          >
            <v-card-text>
              <v-img
                :src="ad.adv_images"
                alt="Logo da BureAuto"
                height="200px"
                width="400px"
              />
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            md="5"
          >
            <v-card-text
              class="breakline text-left overflow overflow-y-auto"
              v-text="ad.adv_description"
            >
            </v-card-text>
          </v-col>
        </v-row>
        </v-col>
      </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script src="./Favorites.js"></script>
<style src="./Favorites.css"></style>