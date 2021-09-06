<template>
  <Card :loading="loading">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-col cols="11">
      <v-row
        align="center"
        justify="center"
        no-gutters
      >
        <v-img
          src="../../assets/bureauto_sem_fundo.png"
          alt="Logo da bureAuto"
          max-height="200"
          max-width="200"
        />
      </v-row>
      <v-row no-gutters>
        <p class="text-h4 bahama--text">Acesso</p>
        <p class="text-h5 bahama--text">Insira seu e-mail e senha para fazer o login.</p>
      </v-row>
      <v-row no-gutters>
        <Input
          placeholder="exemplo@bureau.com"
          :propsRules="[rules.required, rules.email]"
        />
      </v-row>
      <v-row no-gutters>
        <Input
          placeholder="Senha"
          :propsRules="[rules.required]"
        />
      </v-row>
      <v-row
        align="center"
        justify="center"
        class="mb-6 mt-0"
      >
        <Button buttonText="Login" @click="login" />
      </v-row>
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <router-link
          to="/esqueci-a-senha"
          class="text-decoration-none"
        >
          <p class="text-h6 bahama--text">Esqueci minha senha</p>
        </router-link>
      </v-row>
    </v-col>
  </Card>
</template>

<script src="./Login.js"></script>