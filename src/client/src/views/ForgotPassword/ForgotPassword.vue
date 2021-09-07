<template>
  <Card
    :loading="loading"
    cols="12"
    sm="8"
    lg="6"
    xl="4"
    :roundLevel="4"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-col cols="11">
      <v-form
        lazy-validation
        ref="forgotForm"
      >
        <v-row
          align="center"
          justify="center"
          no-gutters
        >
          <v-img
            src="@/assets/bureauto_sem_fundo.png"
            alt="Logo da bureAuto"
            max-height="200"
            max-width="200"
          />
        </v-row>
        <v-row no-gutters>
          <p class="text-h4 bahama--text">Redefinir senha</p>
        </v-row>
        <v-row no-gutters>
          <p class="text-h5 bahama--text text-start">Enviaremos um email com sua nova senha</p>
        </v-row>
        <v-row no-gutters>
          <Input
            placeholder="exemplo@bureau.com"
            :rules="[rules.required, rules.email]"
            v-model="formResetPassword.email"
            type="email"
            name="email"
            required
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="mb-6 mt-0"
        >
          <Button
            buttonText="Enviar email"
            type="submit"
            @click.stop.prevent="resetPassword"
          />
        </v-row>
        <v-row
          no-gutters
          align="center"
          justify="center"
        >
          <router-link
            to="/login"
            class="text-decoration-none"
          >
            <p class="text-h6 bahama--text">Voltar para login</p>
          </router-link>
        </v-row>
      </v-form>
    </v-col>
  </Card>
</template>

<script src="./ForgotPassword.js"></script>