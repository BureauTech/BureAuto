<template>
  <v-container>
    <v-row>
      <v-app-bar
        color="transparent"
        elevation="0"
        justify
      >
        <v-layout>
          <v-col cols="12">
            <h3>
              Mensagens
            </h3>
            Continue conversando por aqui
          </v-col>
        </v-layout>
      </v-app-bar>
    </v-row>
    <v-col>
      <v-row
        justify="start"
        v-for="chat in chats"
        :key="'chat-' + chat.cha_cod"
      >
        <v-col cols="4">
          <v-card
            min-width="100%"
            rounded="xl"
            align-center
            class="text-center margin-layout"
          >
            <v-card-title>
              <v-row
                no-gutters
                justify="end"
              >
                <v-col
                  align="left"
                  cols="auto"
                  v-text="chat.adv_model_description"
                >
                </v-col>
                <v-col
                  align="right"
                  cols="2"
                  class="mx-2"
                >
                  <v-icon
                    large
                    @click="getMessages(chat.cha_cod)"
                  >
                    mdi-eye
                  </v-icon>

                </v-col>
              </v-row>
            </v-card-title>

            <v-col cols="12">
              <v-row>
                <v-col>
                  <v-img
                    :src="chat.adv_images"
                    alt="Logo da BureAuto"
                    max-height="50"
                    max-width="50"
                  />
                </v-col>
                <v-col
                  cols="7"
                  md="4"
                  lg="7"
                >
                  <v-card-text
                    class="breakline text-left overflow"
                    v-text="chat.last_message"
                  >
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card
            min-width="100%"
            rounded="xl"
            align-center
            class="text-center margin-layout"
          >
            <v-col
              cols="8"
              sm="12"
              lg="12"
            >
              <v-card-title>
                <v-img
                  :src="chat.adv_images"
                  alt="Logo da BureAuto"
                  max-height="150"
                  max-width="150"
                />
                <v-row
                  no-gutters
                  justify="end"
                >
                  <v-col
                    align="right"
                    cols="10"
                    v-text="chat.adv_model_description + ' - '
                  + chat.adv_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                  >
                    >
                  </v-col>
                  <v-row>
                    <v-col
                      align="right"
                      cols="12"
                      class="mx-2"
                    >
                      <v-icon
                        large
                        @click="viewAdvertisement(chat.cha_adv_cod)"
                      >
                        mdi-eye
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-row>
              </v-card-title>
              <v-row
                class="breakline text-left overflow overflow-chat"
                ref="messageContainer"
              >
                <v-col
                  cols="8"
                  md="12"
                  lg="12"
                >
                  <v-row
                    v-for="message in messages"
                    :key="'message-' + message.mes_cod"
                    class="message-row"
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
              <v-row>
                <v-col cols="11">
                  <v-textarea
                    class="mx-2"
                    auto-grow
                    outlined
                    label="Escreva sua mensagem"
                    rows="1"
                    row-height="15"
                    v-model="messageForm.message"
                  >
                  </v-textarea>
                </v-col>
                <v-icon
                  large
                  @click="sendMessage"
                >
                  mdi-send
                </v-icon>
              </v-row>
            </v-col>

          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script src="./Messages.js"></script>
<style src="./Messages.css"></style>
