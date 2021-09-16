<template>
  <v-app>
    <v-layout
      row
      justify-center
      margin
      align-top
      class="no-negative"
    >
      <v-col
        cols="6"
        align="left"
      >
        <v-form lazy-validation>
          <v-row
            align="center"
            justify="center"
            no-gutters
          >
          </v-row>
          <v-row no-gutters>
            <p class="text-h4 bahama--text">Dados do seu perfil</p>
          </v-row>
          <v-card
            min-width="50%"
            rounded="xl"
            align-center
            class="text-center"
          >
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col>
                  <b>Apelido:</b> {{$store.getters.getUser.use_nickname}}
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col>
                  <b>Nome:</b> {{$store.getters.getUser.use_name}}
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col>
                  <b>Documento:</b> {{$store.getters.getUser.use_document}}
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col>
                  <b>Telefone:</b> {{$store.getters.getUser.use_phone}}
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col>
                  <b>Endereço:</b> {{$store.getters.getUser.use_address}}
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col>
                  <b>E-mail:</b> {{$store.getters.getUser.use_email}}
                </v-col>
              </p>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-layout>
  </v-app>
</template>