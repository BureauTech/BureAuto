<template>
  <div>

    <v-row class="mt-5 justify-space-around align-start">
      <v-col md="5">
        <div>
          <p class="text-h3 bahama--text">
            {{advertisement.Manufacturer.man_name}}
            <span
              class="font-weight-bold"
              v-text="advertisement.adv_model_description"
            >
            </span>
          </p>
          <v-img
            src="@/assets/bureauto_sem_fundo.png"
            alt="Imagem do anúncio"
          />
        </div>
      </v-col>
      <v-col md="4">
        <Card
          :roundLevel="4"
          cols="9"
        >
          <v-col cols="10">
            <p
              class="text-h3 bahama--text font-weight-bold"
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
            >
              <v-icon left>mdi-star</v-icon>
              Favoritar
            </Button>
            <Button block class="my-5">
              Entrar em contato
            </Button>
          </v-col>
        </Card>
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
        <Card
          :roundLevel="2"
          cols="12"
        >
          <p class="text-h4 bahama--text font-weight-medium pt-2">Descrição do veículo</p>
          <p
            class="text-subtitle-1 text-left px-10 pb-2"
            v-text="advertisement.adv_brand_description"
          ></p>
        </Card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./ViewAdvertisement.js" />