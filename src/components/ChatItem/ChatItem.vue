<template>
  <v-container class="pa-0">
    <v-row
      justify="start"
      no-gutters
    >
      <v-col>
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
                  @click="emit"
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
    </v-row>
  </v-container>
</template>
<script src="./ChatItem.js"></script>