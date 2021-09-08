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
          <p justify>
            Seus anúncios favoritos
          </p>
        </v-col>
      </v-layout>
    </v-app-bar>
    <v-layout
      v-for="r in 2"
      :key="r"
      row
      justify-center
      align-center
    >
      <v-card
        min-width="75%"
        rounded="xl"
      >
        <v-card-title>
          Modelo
        </v-card-title>
        <v-card-text>
          <v-flex>
            <v-img
              src="@/assets/bureauto_sem_fundo.png"
              alt="Logo da bureAuto"
              max-height="150"
              max-width="150"
            />
          </v-flex>
        </v-card-text>
        <v-card-text>
          a partir de R$ 000.000
        </v-card-text>
        <v-btn
          elevation="0"
          color="transparent"
          small
        >
          + informações
        </v-btn>
      </v-card>
    </v-layout>
  </v-app>
</template>

<script src="./Favorites.js"></script>