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
        ref="loginForm"
        lazy-validation
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
          <p class="text-h4 bahama--text">Acesso</p>
          <p class="text-h5 bahama--text text-start">Insira seu e-mail e senha para fazer o login.</p>
        </v-row>
        <v-row no-gutters>
          <Input
            placeholder="exemplo@bureau.com"
            :rules="[rules.required, rules.email]"
            v-model="loginForm.email"
            type="email"
            name="email"
            required
          />
        </v-row>
        <v-row no-gutters>
          <Input
            placeholder="Senha"
            :rules="[rules.required]"
            v-model="loginForm.password"
            type="password"
            required
            name="password"
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="mb-6 mt-0"
        >
          <Button
            buttonText="Login"
            type="submit"
            @click.stop.prevent="login"
          />
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
      </v-form>
    </v-col>
  </Card>
</template>

<script src="./Login.js"></script>