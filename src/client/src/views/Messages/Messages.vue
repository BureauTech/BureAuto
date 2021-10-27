<template>
  <v-container class="main-container">
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
    <v-row
      class="main-container"
      v-if="messages.length"
    >
      <v-col
        cols="4"
        class="scrollable"
      >
        <ChatItem
          v-for="chat in chats"
          :key="'chat-' + chat.cha_cod"
          :chat="chat"
          @openChat="getMessages"
        />
      </v-col>
      <v-col
        cols="8"
        class="max-height-100"
      >
        <MainChat
          :chatMessages="messages"
          :advertisement="advertisementInfo"
          ref="mainChat"
          @send="sendMessage"
        />
      </v-col>
    </v-row>
    <h1 v-else>
      Parece que ainda não há chats
    </h1>
  </v-container>
</template>

<script src="./Messages.js"></script>
<style src="./Messages.css"></style>
