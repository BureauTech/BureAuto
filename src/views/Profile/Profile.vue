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
        cols="12"
        sm="9"
        md="7"
        lg="6"
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
              <v-col
                cols="12"
                sm="auto"
              >
                <p class="text-h4 bahama--text">Dados do seu perfil</p>

              </v-col>
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
                          Ao clicar em "Confirmar", sua conta será permanentemente excluída, e será necessário contatar o administrador
                          para criação de um novo cadastro.
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
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
                      class="m-2"
                      fab
                      dark
                      small
                      color="blue"
                      @click="goToEditProfile"
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
            class="text-center py-5"
          >
            <v-row
              justify="start"
              no-gutters
              class="px-3"
            >
              <v-col cols="auto">
                <p class="text-left font-weight-bold mr-2">
                  Apelido:
                </p>
              </v-col>
              <v-col>
                <p
                  class="text-left"
                  v-text="$store.getters.getUser.use_nickname"
                />
              </v-col>
            </v-row>
            <v-row
              justify="start"
              no-gutters
              class="px-3"
            >
              <v-col cols="auto">
                <p class="text-left font-weight-bold mr-2">
                  Nome:
                </p>
              </v-col>
              <v-col>
                <p
                  class="text-left"
                  v-text="$store.getters.getUser.use_name"
                />
              </v-col>
            </v-row>
            <v-row
              justify="start"
              no-gutters
              class="px-3"
            >
              <v-col cols="auto">
                <p class="text-left font-weight-bold mr-2">
                  Documento:
                </p>
              </v-col>
              <v-col>
                <p
                  class="text-left"
                  v-text="$store.getters.getUser.use_document"
                />
              </v-col>
            </v-row>
            <v-row
              justify="start"
              no-gutters
              class="px-3"
            >
              <v-col cols="auto">
                <p class="text-left font-weight-bold mr-2">
                  Telefone:
                </p>
              </v-col>
              <v-col>
                <p
                  class="text-left"
                  v-text="$store.getters.getUser.use_phone"
                />
              </v-col>
            </v-row>
            <v-row
              justify="start"
              no-gutters
              class="px-3"
            >
              <v-col cols="auto">
                <p class="text-left font-weight-bold mr-2">
                  Endereço:
                </p>
              </v-col>
              <v-col>
                <p
                  class="text-left"
                  v-text="$store.getters.getUser.use_address"
                />
              </v-col>
            </v-row>
            <v-row
              justify="start"
              no-gutters
              class="px-3"
            >
              <v-col cols="auto">
                <p class="text-left font-weight-bold mr-2">
                  E-mail:
                </p>
              </v-col>
              <v-col>
                <p
                  class="text-left"
                  v-text="$store.getters.getUser.use_email"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-layout>
  </v-app>
</template>

<script src="./Profile.js"></script>
