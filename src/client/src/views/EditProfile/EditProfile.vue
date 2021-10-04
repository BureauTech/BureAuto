<template>
  <v-app>
    <v-progress-linear
      :active="loading"
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    <v-layout
      row
      justify-center
      margin
      align-top
      class="no-negative"
    >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
      <v-row class="mt-5 justify-space-around align-start">
        <v-col md="6">
          <p class="text-h4 bahama--text pb-10">Dados do seu perfil</p>
          <v-row class="justify-center">
            <v-col md="3">
              <b>Apelido:</b>
            </v-col>
            <v-text-field
              rounded
              outlined
              v-model="userInf.use_nickname"
            />
          </v-row>

          <v-row class="justify-center">
            <v-col md="3">
              <b>Nome:</b>
            </v-col>
            <v-text-field
              rounded
              outlined
              v-model="userInf.use_name"
            />
          </v-row>
          <v-row class="justify-center">
            <v-col md="3">
              <b>Telefone:</b>
            </v-col>
            <v-text-field
            type="tel"
              rounded
              outlined
              v-model="userInf.use_phone"
            />
          </v-row>
          <v-row class="justify-center">
            <v-col md="3">
              <b>Endereço:</b>
            </v-col>
            <v-text-field
              rounded
              outlined
              v-model="userInf.use_address"
            />
          </v-row>
          <v-row class="justify-center">
            <v-col md="3">
              <b>Email:</b>
            </v-col>
            <v-text-field
                type="email"
              rounded
              outlined
              v-model="userInf.use_email"
            />
          </v-row>
          <v-row class="mt-5 justify-space-around align-start">

            <v-col md="5">
              <v-btn
              min-width="100%"
                elevation="2"
                rounded
                color="bahama"
                class="white--text text-none text-h5"
                @click="editUser"
              >
                Salvar
              </v-btn>
            </v-col>

            <v-col md="5">
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
        </v-col>
      </v-row>
    </v-layout>
  </v-app>
</template>

<script src="./EditProfile.js"></script>