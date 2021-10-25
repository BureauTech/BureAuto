<template>
  <v-app>
    <v-layout>
      <v-layout
        row
        justify-center
        class="no-negative"
      >
        <v-col
          cols="9"
          sm="5"
          md="3"
          class="margin-layout"
        >
          <v-row>
            <v-card
              min-width="100%"
              rounded="xl"
              max-height="30%"
              cols="3"
              class="bg-transparent"
            >
              <v-expansion-panels multiple>
                <v-expansion-panel class="panel-search">
                  <v-text-field
                    outlined
                    rounded
                    required
                    color="bahama"
                    placeholder="Pesquisa"
                    v-model="termSearch"
                    @keypress.enter="searchAds"
                  />
                  <v-expansion-panel-header class="panel-search">
                    <v-card-text
                      v-text="'Filtros '"
                      class="text-h5"
                    />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-select
                      placeholder="Marca"
                      type="text"
                      name="brand"
                      :items="formCategories.brand"
                      v-model="filters.brand"
                    />
                    <v-select
                      placeholder="Modelo"
                      type="text"
                      name="model"
                      :items="formCategories.model"
                      v-model="filters.model"
                    />
                    <v-select
                      placeholder="Ano do modelo"
                      type="text"
                      name="yearModel"
                      :items="formCategories.yearManModel"
                      v-model="filters.yearManModel"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-card-text
                      v-text="'Valor '"
                      class="text-h5"
                    />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-subheader class="pl-0">
                      Mínimo R$ {{filters.valueMin}}
                    </v-subheader>
                    <v-row>
                      <v-slider
                        name="valueMin"
                        v-model="filters.valueMin"
                        :max="formCategories.valueMax"
                        :min="formCategories.valueMin"
                      ></v-slider>
                    </v-row>
                    <v-subheader class="pl-0">
                      Máximo R$ {{filters.valueMax}}
                    </v-subheader>
                    <v-row>
                      <v-slider
                        name="valueMax"
                        v-model="filters.valueMax"
                        :max="formCategories.valueMax"
                        :min="formCategories.valueMin"
                        @change="getAds"
                        :rules="[rules.maxValue(filters.valueMin, filters.valueMax)]"
                      >
                      </v-slider>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-btn
                elevation="0"
                large
                color="transparent"
                min-width="100%"
                class="btn-search"
                @click="searchAds"
              >
                Buscar
              </v-btn>
            </v-card>
          </v-row>
        </v-col>
        <v-col
          cols="10"
          sm="12"
          md="9"
        >
          <v-row>
            <v-col
              v-for="ad in ads"
              :key="ad.adv_cod"
              sm="6"
              md="4"
              align="center"
            >
              <router-link
                :to="`/anuncio/${ad.adv_cod}`"
                class="text-decoration-none"
              >
                <v-card
                  min-width="100%"
                  rounded="xl"
                  hover
                  class="hover-card"
                >
                  <v-img
                    :src="ad.adv_images"
                    alt="Logo da bureAuto"
                    height="200"
                  >
                    <v-card-title
                      v-text="ad.Manufacturer.man_name"
                      class="text-h5 mousehover text-shadow"
                    />
                  </v-img>
                  <v-card-subtitle
                    v-text="ad.adv_model_description"
                    class="text-h5"
                  />
                  <v-card-text
                    v-text="ad.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                    class="text-h5"
                  />
                  <!-- <v-btn
                    elevation="0"
                    color="transparent"
                    small
                    @click="$router.push(`/anuncio/${ad.adv_cod}`)"
                  >
                    + informações
                  </v-btn> -->
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-layout>
    </v-layout>
  </v-app>
</template>

<script src="./Home.js"></script>
<style src="./Home.css" scoped></style>
