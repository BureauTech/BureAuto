<template>
  <v-container class="main-container max-height-100 pa-0">
    <v-card
      min-width="100%"
      rounded="xl"
      align-center
      class="text-center margin-layout max-height-100 d-flex flex-column"
    >
      <v-col
        cols="8"
        sm="12"
        lg="12"
        class="max-height-100"
      >
        <v-card-title class="justify-space-between">
          <v-img
            :src="advertisement.adv_images"
            alt="Logo da BureAuto"
            max-height="85"
            max-width="150"
          />
          <div>
            <span
              class="px-5"
              v-text="advertisement.adv_model_description + ' - '
                  + advertisement.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
            />
            <v-icon
              large
              @click="viewAdvertisement(advertisement.adv_cod)"
            >
              mdi-eye
            </v-icon>
          </div>
        </v-card-title>
        <v-card-text
          class="max-height-x mb-3"
          ref="messageContainer"
        >
          <v-row class="breakline text-left">
            <v-col
              cols="8"
              md="12"
              lg="12"
            >
              <v-row
                v-for="message in chatMessages"
                :key="'message-' + message.mes_cod"
              >
                <v-card-text
                  v-if="message.mes_use_cod != $store.getters.getUser.use_cod"
                  v-text="message.mes_text"
                  class="receiver-color"
                >
                </v-card-text>
                <v-card-text
                  v-else
                  v-text="message.mes_text"
                  class="sender-color"
                >
                </v-card-text>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-row class="align-center">
          <v-col cols="11">
            <v-textarea
              class="mx-2 center-icon"
              auto-grow
              outlined
              label="Escreva sua mensagem"
              rows="1"
              row-height="15"
              v-model="currentMessage"
            >
              <template v-slot:append-outer>
                <v-icon
                  large
                  class="icon-style"
                  @click="emit"
                >
                  mdi-send
                </v-icon>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script src="./MainChat.js"></script>
<style src="./MainChat.css"></style>