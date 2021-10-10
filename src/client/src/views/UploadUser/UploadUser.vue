<template>
  <Card
    :roundLevel="0"
    class="Card"
    colorCard="transparent"
    sm="10"
    xs="12"
  >
    <ImportCsv
      @selectFile="attachFile"
      @importFile="importData"
    />
    <v-row v-if="users.length == 0">
      <v-col>
        <v-img
          src="@/assets/board-image.png"
          max-height="300"
          max-width="400"
          aspect-ratio="1"
          contain
        />
        <v-col
          lg="4"
          xl="3"
          sm="6"
          cols="9"
        >
          <p
            class="p-info text-h5 font-weight-medium"
            v-text="`Você não possui usuários no momento`"
          ></p>
        </v-col>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <Card
          :roundLevel="0"
          class="Card"
          colorCard="transparent"
          sm="10"
          xs="12"
        >
          <template>
            <v-data-table
              :headers="headers"
              :items="users"
              sort-by="use_cod"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Lista de Usuários</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:item.edit="{ item }">
                <v-btn
                  small
                  @click="Edit(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  small
                  @click="Delete(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="500"
            >
              <v-card>
                <v-card-title class="text-h6">
                  Tem certeza que deseja excluir este usuário?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false"
                  >
                    Não
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="DeleteUser()"
                  >
                    Sim
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="dialogCsvError"
              persistent
              max-width="500"
            >
              <v-card>
                <v-card-title class="text-h6">
                  Alguns usuários não foram cadastrados. Deseja baixar o arquivo de erros?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="dialogCsvError = false"
                  >
                    Não
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="DownloadErrors()"
                  >
                    Sim
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </Card>
      </v-col>
    </v-row>
  </Card>
</template>

<script src="./UploadUser.js" scoped></script>

<style src="./UploadUser.css"></style>