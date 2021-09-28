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
              <v-col align="right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="290"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="mx-2"
                          fab
                          dark
                          small
                          color="red"
                        >
                          <v-icon dark>
                            mdi-trash-can-outline
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="text-h5">
                          Excluir minha conta
                        </v-card-title>
                        <v-card-text>
                          Ao clicar em "Confirmar", sua conta será permanentemente excluída, e será necessário contatar o adminstrador
                          para criação de um novo cadastro.
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="deleteUser"
                          >
                            Confirmar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <span>Excluir minha conta</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="mx-2"
                      fab
                      dark
                      small
                      color="blue"
                    >
                      <v-icon dark>
                        mdi-square-edit-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar meu perfil</span>
                </v-tooltip>
              </v-col>
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
      </v-col>
    </v-layout>
  </v-app>
</template>

<script src="./Profile.js"></script>
