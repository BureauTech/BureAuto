<template>
  <v-container>
    <v-row>
    <v-app-bar
      color="transparent"
      elevation="0"
      justify
    >
      <v-layout>
        <v-col
          cols="16"
        >
          <h3>
            Favoritos
          </h3>
          Seus anúncios favoritos
        </v-col>
      </v-layout>
    </v-app-bar>
    </v-row>
      <v-layout
        v-for="(ad, index) in ads"
        :key="ad.adv_cod"
        cols="4"
        row
        justify-center
        align-start
        class="no-negative"
      >
        <v-card
          min-width="75%"
          rounded="xl"
          align-center
          class="text-center margin-layout"
        >
          <v-card-title>
            <v-col
              align="right"
              cols="7"
              v-text="ad.adv_model_description + ' - ' + ad.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
            >
            </v-col>
            <v-col align="right">
              <v-icon
                large
                @click="deleteFav(ad.adv_cod, index)"
              >
                mdi-trash-can-outline
              </v-icon>
            </v-col>
          </v-card-title>
          <v-row>
            <v-col
              cols="4"
              align="center"
            >
              <v-card-text>
                <v-img
                  src="@/assets/bureauto_sem_fundo.png"
                  alt="Logo da bureAuto"
                  max-height="150"
                  max-width="150"
                />
              </v-card-text>
            </v-col>
            <v-col
              align="justify"
              max-width="75%"
              cols="8"
            >
              <v-list-item v-text="ad.adv_brand_description">
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
  </v-container>
</template>

<script src="./Favorites.js"></script>
<style src="./Favorites.css"></style>