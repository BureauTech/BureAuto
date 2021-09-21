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
          <v-col>
            <v-row no-gutters>
              <p class="text-h4 bahama--text">Dados do seu perfil</p>
            </v-row>
          </v-col>
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
                <v-col> <b>Apelido: </b>
                  <span v-text="$store.getters.getUser.use_nickname" />
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col> <b>Nome: </b>
                  <span v-text="$store.getters.getUser.use_name" />
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col> <b>Documento: </b>
                  <span v-text="$store.getters.getUser.use_document" />
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col> <b>Telefone: </b>
                  <span v-text="$store.getters.getUser.use_phone" />
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col> <b>Endereço: </b>
                  <span v-text="$store.getters.getUser.use_address" />
                </v-col>
              </p>
            </v-row>
            <v-row
              justify="left"
              no-gutters
            >
              <p>
                <v-col> <b>E-mail: </b>
                  <span v-text="$store.getters.getUser.use_email" />
                </v-col>
              </p>
            </v-row>
          </v-card>
        </v-form>
        <v-col
          cols="12"
          align="right"
        >
          <v-btn
            align="right"
            color="transparent"
            small
          >
            Editar Informações
          </v-btn>
        </v-col>
      </v-col>
    </v-layout>
  </v-app>
</template>