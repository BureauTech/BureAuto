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
              Mensagens
            </h3>
            Continue conversando por aqui
          </v-col>
        </v-layout>
      </v-app-bar>
    </v-row>
    <!-- <v-layout
      v-for="(ad, index) in ads"
      :key="ad.adv_cod"
      cols="4"
      row
      justify-center
      align-start
      class="no-negative"
    > -->
    <v-row
      justify="start"
      v-for="(ad, index) in ads"
      :key="ad.adv_cod"
    >
      <v-col cols="4">
        <v-card
          min-width="100%"
          rounded="xl"
          align-center
          class="text-center margin-layout"
        >
          <v-col cols="12">
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
                  cols="2"
                  class="mx-2"
                >
                  <v-icon
                    large
                    @click="viewAdvertisement(ad.adv_cod)"
                  >
                    mdi-eye
                  </v-icon>
                </v-col>
              </v-row>
            </v-card-title>
            <v-row>
              <v-col
                cols="4"
                align="center"
                justify="center"
              >
                <v-card-text>
                  <v-img
                    :src="ad.adv_images"
                    alt="Logo da BureAuto"
                    max-height="400"
                    max-width="400"
                  />
                </v-card-text>
              </v-col>
              <v-col
                cols="7"
                md="4"
                lg="7"
              >
                <v-card-text
                  class="breakline text-left overflow"
                  v-text="ad.adv_description"
                >
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card
          min-width="100%"
          rounded="xl"
          align-center
          class="text-center margin-layout"
        >
          <v-col
            cols="8"
            sm="12"
            lg="12"
          >
            <v-card-title>
              <v-img
                :src="ad.adv_images"
                alt="Logo da BureAuto"
                max-height="150"
                max-width="150"
              />
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
                  cols="2"
                  class="mx-2"
                >
                  <v-icon
                    large
                    @click="viewAdvertisement(ad.adv_cod)"
                  >
                    mdi-eye
                  </v-icon>
                </v-col>
              </v-row>
            </v-card-title>
            <v-row>
              <v-col
                cols="8"
                md="12"
                lg="12"
              >
                <v-card-text
                  class="breakline text-left overflow-chat"
                  v-text="ad.adv_description"
                >
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
      <!-- </v-layout> -->
    </v-row>
  </v-container>
</template>

<script src="./Messages.js"></script>
<style src="./Messages.css"></style>