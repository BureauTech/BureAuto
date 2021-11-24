<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
      class="bahama--text"
    >
      <v-col class="d-none d-md-flex">
        <router-link
          to="/"
          class="text-decoration-none"
        >
          <v-img
            src="@/assets/bureauto_sem_fundo.png"
            alt="Logo da bureAuto"
            max-height="100"
            max-width="100"
          />
        </router-link>
      </v-col>
      <v-col
        v-for="link in linksDisponiveis"
        :key="link.path"
      >
        <router-link
          :to="link.path"
          class="text-decoration-none d-none d-sm-flex"
          v-text="link.text"
        >
        </router-link>
      </v-col>
      <v-col>
        <a
          class="text-decoration-none d-none d-sm-flex"
          @click="logout"
          v-text="$store.getters.isAuthenticated ? 'Logout' : 'Login'"
        />
      </v-col>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-sm-none"
      ></v-app-bar-nav-icon>
    </v-row>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="150"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            to="/"
            class="text-decoration-none"
          >
            <v-img
              src="@/assets/bureauto_sem_fundo.png"
              alt="Logo da bureAuto"
              max-height="100"
              max-width="100"
            />
          </v-list-item>
          <v-list-item
            v-for="link in linksDisponiveis"
            :key="link.path"
            :to="link.path"
            class="text-decoration-none d-sm-none"
          >
            <v-list-item-title>
              <p
                v-text="link.text"
                class="text-h6 font-weight-regular"
              ></p>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout">
              <a class="text-decoration-none black--text d-sm-none text-h6 font-weight-regular">
                <p v-text="$store.getters.isAuthenticated ? 'Logout' : 'Login'"></p>
              </a>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script src="./Topbar.js"></script>