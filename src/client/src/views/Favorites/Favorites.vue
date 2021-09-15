<template>
  <v-app>
    <v-app-bar
      color="transparent"
      elevation="0"
      justify
    >
      <v-layout>
        <v-col
          cols="16"
          align="left"
        >
          <h3>
            Favoritos
          </h3>
          Seus anúncios favoritos
        </v-col>
      </v-layout>
    </v-app-bar>
    <v-layout
      v-for="r in 2"
      :key="r"
      row
      justify-center
      align-center
      class="no-negative"
    >
      <v-card
        min-width="75%"
        rounded="xl"
        align-center
        class="text-center"
      >
        <v-card-title>
          <v-col
            align="right"
            cols="7"
          >
            Fusca
            - R$ 10.250
          </v-col>
          <v-col align="right">
            <v-icon large>
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
            <v-list-item>
              Esse Fusca é tunadão! Tem turbo, ar-condicionado, 5 portas e bagageiro<br>
              É azul! Dá pra você passar em uma escola e ver as crianças se batendo. :)
            </v-list-item>
          </v-col>
        </v-row>
        Vendido por FuscaTunadao2021
      </v-card>
    </v-layout>
  </v-app>
</template>

<script src="./Favorites.js"></script>
<style src="./Favorites.css"></style>