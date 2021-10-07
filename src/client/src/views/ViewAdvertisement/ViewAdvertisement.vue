<template>
  <div>

    <v-row
      class="mt-5 justify-space-around align-start"
      no-gutters
    >
      <v-col
        md="5"
        sm="8"
        cols="11"
      >
        <div>
          <p class="text-h3 bahama--text">
            {{advertisement.Manufacturer.man_name}}
            <span
              class="font-weight-bold"
              v-text="advertisement.adv_model_description"
            >
            </span>
          </p>
        </div>
        <Card
          :roundLevel="4"
          md="12"
          sm="12"
        >
          <v-col
            class="align-center"
            md="12"
          >
            <img
              height="300"
              width="100%"
              md="6"
              id="image"
              :src="imageUrl"
            />
          </v-col>
        </Card>

      </v-col>
      <v-col
        md="5"
        sm="8"
        cols="11"
      >
        <Card
          :roundLevel="4"
          lg="9"
          sm="12"
        >
          <v-col
            md="10"
            sm="11"
            cols="12"
          >
            <p
              class="text-h4 bahama--text font-weight-bold"
              v-text="advertisement.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
            ></p>
            <p class="text-h5 bahama--text font-weight-medium">Sobre esse veículo</p>
            <v-row class="align-center">
              <v-col cols="3">
                <v-icon
                  x-large
                  color="bahama"
                >mdi-calendar-month</v-icon>
              </v-col>
              <v-col>
                <p class="text-subtitle-1 bahama--text ma-0 text-left">ano</p>
                <p
                  class="text-h5 bahama--text font-weight-medium text-left"
                  v-text="`${advertisement.adv_year_manufacture} / ${advertisement.adv_year_model}`"
                >

                </p>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="3">
                <v-icon
                  x-large
                  color="bahama"
                >mdi-account</v-icon>
              </v-col>
              <v-col>
                <p class="text-subtitle-1 bahama--text ma-0 text-left">Vendedor</p>
                <p
                  class="text-h5 bahama--text font-weight-medium text-left"
                  v-text="advertisement.use_is_cpf_document ? 'Pessoa Física' : 'Pessoa Jurídica'"
                ></p>
              </v-col>
            </v-row>
            <Button
              block
              class="my-5"
              @click="updateFavorite"
            >
              <v-icon left>mdi-star</v-icon>
              {{favorite ? 'Desfavoritar' : 'Favoritar'}}
            </Button>
            <Button
              block
              class="my-5"
              v-text="'Entrar em contato'"
            ></Button>
          </v-col>
        </Card>
      </v-col>
    </v-row>
    <v-row
      class="mt-5 justify-space-around align-start"
      no-gutters
    >
      <v-col
        lg="5"
        md="6"
        sm="8"
        cols="11"
      >
        <Card
          :roundLevel="2"
          cols="12"
        >
          <p class="text-h4 bahama--text font-weight-medium pt-2">Descrição do veículo</p>
          <p
            class="text-subtitle-1 text-left px-10 pb-2 breakline"
            v-text="advertisement.adv_description"
          ></p>
        </Card>
      </v-col>
      <v-col
        md="5"
        sm="8"
        cols="11"
      ></v-col>
    </v-row>
  </div>
</template>

<script src="./ViewAdvertisement.js" />
<style src="./ViewAdvertisement.css" />