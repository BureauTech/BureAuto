<template>
  <v-container fluid class="flex-grow-1">

  <chat-window
    :current-user-id="currentUserId"
    :rooms="rooms"
    :loadingRooms="false"
    :roomsLoaded="true"
    :messages="messages"
    :messagesLoaded="true"
    :show-add-room="false"
    :show-files="false"
    :show-audio="false"
    @send-message="sendMessage"
    @fetch-messages="getMessages"
    :room-message="message"
    :text-messages="textMessages"
    :show-new-messages-divider="false"
    :styles="{
      message: {
        backgroundMe: 'var(--v-bahama-lighten4)',
        background: 'var(--v-bahama-lighten3)'
      }
    }"
    height="100%"
  >
  <template v-slot:toggle-icon>
    <v-icon color="bahama">mdi-arrow-left-circle</v-icon>
  </template></chat-window>
  </v-container>
</template>

<script src="./TestMessage.js"></script>