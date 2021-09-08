<template>

  <v-app>
    <v-app-bar
      color="transparent"
      elevation="0"
      justify
    >
      <v-layout
        align-center
        justify-sm
      >
        <v-col
          max-width="10%"
          cols="1"
          align="right"
        >
          Ordenar:
        </v-col>
        <v-col align="left">
          <v-toolbar
            dense
            max-width="20%"
          >
            <v-select
              :items="items"
              multiple
              label="Defina uma busca"
            ></v-select>
          </v-toolbar>
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
      <v-col
        v-for="c in 3"
        :key="c"
        cols="3"
        align="center"
      >
        <v-card
          min-width="100%"
          rounded="xl"
        >
          <v-card-title>
            Modelo
          </v-card-title>
          <v-img
            src="@/assets/bureauto_sem_fundo.png"
            alt="Logo da bureAuto"
            max-height="200"
            max-width="200"
          />
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
      </v-col>
    </v-layout>
  </v-app>
</template>

<script src="./Home.js"></script>