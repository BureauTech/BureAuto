<template>
  <v-app>
    <v-layout>
      <v-layout
        row
        justify-center
        class="no-negative"
      >
        <v-col
          cols="3"
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
                  <v-expansion-panel-header class="panel-search">
                    <v-card-text
                      v-text="'Filtros '"
                      class="text-h5"
                    />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <Select
                      placeholder="Marca"
                      type="text"
                      name="brand"
                      :items="formCategories.brand"
                    />
                    <Select
                      placeholder="Modelo"
                      type="text"
                      name="model"
                      :items="formCategories.model"
                    />
                    <Select
                      placeholder="Ano do modelo"
                      type="text"
                      name="yearModel"
                      :items="formCategories.yearModel"
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
                    <Input
                      placeholder="Mínimo R$"
                      :rules="[rules.number]"
                      v-model="formCategories.valueMin"
                      type="text"
                      name="valueMin"
                    />
                    <Input
                      placeholder="Máximo R$"
                      :rules="[rules.number, rules.maxValue(formCategories.valueMin, formCategories.valueMax)]"
                      v-model="formCategories.valueMax"
                      type="text"
                      name="valueMax"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-btn
                elevation="0"
                large
                color="transparent"
                min-width="100%"
                class="btn-search"
              >
                Buscar
              </v-btn>
            </v-card>
          </v-row>
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
                  :src="imageConverter.arrayBufferToString(ad.adv_images)"
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
                  v-text="ad.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                  class="text-h5"
                />
                <v-btn
                  elevation="0"
                  color="transparent"
                  small
                  @click="$router.push(`/anuncio/${ad.adv_cod}`)"
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

<!--:src="imageConverter.arrayBufferToString(ad.adv_images)"
-->