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
    <v-row>
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
          </template>
        </Card>
      </v-col>
    </v-row>
  </Card>
</template>

<script src="./UploadUser.js" scoped></script>

<style src="./UploadUser.css"></style>