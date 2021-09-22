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
        ref="ChangePasswordForm"
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
          <p class="text-h4 bahama--text">Alterar senha</p>
        </v-row>
        <v-row no-gutters>
          <Input
            placeholder="Nova senha"
            :rules="[rules.required]"
            v-model="ChangePasswordForm.newPassword"
            type="password"
            required
            name="newPassword"
          />
        </v-row>
        <v-row no-gutters>
          <Input
            placeholder="Confirmar senha"
            :rules="[rules.required,rules.same(ChangePasswordForm.newPassword, ChangePasswordForm.confirmNewPassword)]"
            v-model="ChangePasswordForm.confirmNewPassword"
            type="password"
            required
            name="validateNewPassword"
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="mb-6 mt-6"
        >
          <Button
            type="submit"
            min-width="150"
            min-height="50"
            @click.stop.prevent="changePassword"
          >
            Salvar
          </Button>
        </v-row>
      </v-form>
    </v-col>
  </Card>
</template>

<script src="./ChangePassword.js"></script>