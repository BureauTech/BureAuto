<template>
  <div>

    <v-row class="mt-5 justify-space-around align-start">

      <v-col md="5">
        <v-row>
          <v-col>
            <p class="bahama--text font-weight-medium pt-2">Marca</p>
            <v-text-field
              outlined
              rounded
              color="bahama"
              v-model="advertisement.Manufacturer.man_name"
            />
          </v-col>
          <v-col>
            <p class="bahama--text font-weight-medium pt-2">Modelo</p>
            <v-text-field
              outlined
              rounded
              color="bahama"
              v-model="advertisement.adv_model_description"
            />
          </v-col>
        </v-row>
        <div>

          <p class="bahama--text font-weight-medium pt-2">Descrição do veículo</p>
          <v-textarea
            outlined
            rounded
            height="auto"
            color="bahama"
            v-model="advertisement.adv_brand_description"
          />

        </div>
      </v-col>

      <v-col
        md="4"
        cols="10"
      >
        <v-row>
          <v-col>
            <p class="bahama--text font-weight-medium pt-2">Ano fabricção</p>
            <v-text-field
              type="number"
              outlined
              rounded
              color="bahama"
              v-model="advertisement.adv_year_manufacture"
            />
          </v-col>
          <v-col>
            <p class="bahama--text font-weight-medium pt-2">Ano modelo</p>
            <v-text-field
              type="number"
              outlined
              rounded
              color="bahama"
              v-model="advertisement.adv_year_model"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <p class="bahama--text font-weight-medium pt-2">Preço</p>
            <v-text-field
              type="number"
              outlined
              name="preco"
              rounded
              color="bahama"
              v-model="advertisement.adv_value"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row
      class="align-start justify-start"
      no-gutters
    >
      <v-col
        md="7"
        offset="1"
      >
        <v-img
          src="@/assets/bureauto_sem_fundo.png"
          alt="Imagem do anúncio"
        />
      </v-col>
    </v-row>

    <v-row
      class="justify-center"
      no-gutters
    >
      <v-col md="5">

        <Button min-width="100%" @click="editAdvertisement">
          Salvar
        </Button>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./EditAdvertise.js"/>

<!--
:value="advertisement.adv_value"
:value="advertisement.adv_year_model"
:value="advertisement.adv_year_manufacture"
:value="advertisement.adv_model_description"
:value="advertisement.adv_brand_description"
-->