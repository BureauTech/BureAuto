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
                    clearable
                    v-model="filters.term"
                    @keypress.enter="searchAds"
                    @click:clear="clearTermSearched"
                  />
                  <v-row v-if="filters.brand || filters.model || filters.yearManModel">
                    <v-col align-self="center">
                      <v-chip
                        v-if="filters.brand"
                        class="ma-2"
                        close
                        @click:close="filters.brand = undefined"
                      >
                        {{ filters.brand }}
                      </v-chip>
                      <v-chip
                        v-if="filters.model"
                        class="ma-2"
                        close
                        @click:close="filters.model = undefined"
                      >
                        {{ filters.model }}
                      </v-chip>
                      <v-chip
                        v-if="filters.yearManModel"
                        class="ma-2"
                        close
                        @click:close="filters.yearManModel = undefined"
                      >
                       {{ filters.yearManModel }}
                      </v-chip>
                      <a @click="clearAll">
                        Limpar tudo
                      </a>
                    </v-col>
                  </v-row>
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
                    <v-row>

                      <v-range-slider
                        v-model="rangeValue"
                        :max="adsMaxValue"
                        :min="adsMinValue"
                        hide-details
                        class="align-center"
                        @change="filterValueMinMax($event)"
                      > </v-range-slider>
                    </v-row>
                    <v-row>
                      <v-col
                        style="padding: 0 0 0 0;"
                        align="left"
                      >
                        <v-chip disabled>{{"R$ "+rangeValue[0]}}</v-chip>
                      </v-col>
                      <v-col
                        style="padding: 0 0 0 0;"
                        align="right"
                      >
                        <v-chip disabled>{{"R$ "+rangeValue[1]}}</v-chip>
                      </v-col>
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
                :disabled="!filters.term"
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
                  height="100%"
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
                </v-card>
              </router-link>
            </v-col>
          </v-row>
            <template>
              <div class="text-left mt-4">
                <v-pagination
                  v-model="pagination.currentPage"
                  :length="pagination.totalPages"
                  @input="handlePageChange"
                  :total-visible="6"
                  circle
                ></v-pagination>
              </div>
            </template>
        </v-col>
      </v-layout>
    </v-layout>
  </v-app>
</template>

<script src="./Home.js"></script>
<style src="./Home.css" scoped></style>
