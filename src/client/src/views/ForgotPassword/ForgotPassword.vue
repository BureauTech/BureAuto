<template>
  <Card>
    <v-col cols="11">
      <v-row
        align="center"
        justify="center"
        no-gutters
      >
        <v-img
          src="../../../../../doc/img/bureauto_sem_fundo.png"
          alt="Logo da bureAuto"
          max-height="200"
          max-width="200"
        />
      </v-row>
      <v-row no-gutters>
        <p class="text-h4 bahama--text">Acesso</p>
      </v-row>
      <v-row no-gutters>
        <p class="text-h5 bahama--text">Insira seu e-mail</p>
      </v-row>
      <v-row no-gutters>
        <Input placeholder="exemplo@bureau.com"
          :propsRules="[rules.required, rules.email]" />
      </v-row>
      <v-row
        align="center"
        justify="center"
        class="mb-6 mt-0"
      >
        <Button buttonText="Enviar" @click="teste" />
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
          <p class="text-h6 bahama--text">Realizar login</p>
        </router-link>
      </v-row>
    </v-col>
  </Card>
</template>

<script src="./ForgotPassword.js"></script>