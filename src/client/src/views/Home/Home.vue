<template>
  <v-app>
    <v-layout>
      <v-layout
        row
        justify-center
        class="no-negative"
      >
        <v-col cols="3">
          <v-card
            min-width="100%"
            rounded="xl"
            max-height="30%"
            cols="3"
            class="bg-transparent"
          >
            <v-card-text
              v-text="'R$ '"
              class="text-h5"
            />
            <v-btn
              elevation="0"
              color="transparent"
              small
            >
              + informações
            </v-btn>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col
              v-for="ad in ads"
              :key="ad.adv_cod"
              cols="4"
              align="center"
            >
              <v-card
                min-width="100%"
                rounded="xl"
              >
                <v-img
                  src="@/assets/bureauto_sem_fundo.png"
                  alt="Logo da bureAuto"
                  max-height="300"
                >
                  <v-card-title
                    v-text="ad.Manufacturer.man_name"
                    class="text-h5 bahama--text mousehover"
                  />
                </v-img>
                <v-card-subtitle
                  v-text="ad.adv_model_description"
                  class="text-h5"
                />
                <v-card-text
                  v-text="'R$ ' + ad.adv_value.toLocaleString('pt-br')"
                  class="text-h5"
                />
                <v-btn
                  elevation="0"
                  color="transparent"
                  small
                >
                  + informações
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-layout>
    </v-layout>

  </v-app>
</template>

<script src="./Home.js"></script>
<style src="./Home.css" scoped></style>