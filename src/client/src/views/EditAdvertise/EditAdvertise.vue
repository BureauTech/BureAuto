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
        <div>

          <p class="bahama--text font-weight-medium pt-2">Selecione a imagem</p>
          <v-file-input
            v-model="files"
            placeholder="Selecione a imagem"
            outlined
            rounded
            height="auto"
            color="bahama"
            accept="image/*"
            @change="imageUploaded"
          />
          <v-col>
            <img
              width="100%"
              id="image"
              src="@/assets/bureauto_sem_fundo.png"
            />
          </v-col>

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
      class="justify-space-around pb-5"
      no-gutters
    >
      <v-col md="4">
        <v-btn
          min-width="100%"
          elevation="2"
          rounded
          color="bahama"
          class="white--text text-none text-h5"
          @click="editAdvertisement"
        >
          Salvar
        </v-btn>
      </v-col>
      <v-col md="4">
        <v-btn
          min-width="100%"
          elevation="2"
          rounded
          color="red"
          class="white--text text-none text-h5"
          @click="cancel"
        >
          Cancelar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./EditAdvertise.js"/>