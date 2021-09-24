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
              :value="advertisement.Manufacturer.man_name"
            />
          </v-col>
          <v-col>
            <p class="bahama--text font-weight-medium pt-2">Modelo</p>
            <v-text-field
              outlined
              rounded
              color="bahama"
              :value="advertisement.adv_model_description"
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
            value=""
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
              :value="advertisement.adv_year_manufacture"
            />
          </v-col>
          <v-col>
            <p class="bahama--text font-weight-medium pt-2">Ano modelo</p>
            <v-text-field
              type="number"
              outlined
              rounded
              color="bahama"
              :value="advertisement.adv_year_model"
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
              :value="advertisement.adv_value.toLocaleString('pt-br')"
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

        <Button min-width="100%">
          Salvar
        </Button>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./EditAdvertise.js"/>