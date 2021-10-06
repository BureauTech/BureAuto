import axios from "@/axios"

export default {
    name: "Topbar",
    methods: {
        logout: async function() {
            await axios.get("/logout")
            window.location.href = "/login"
        }
    },
    data: function() {
        return {
            drawer: false,
            group: null,
            links: [{
                path: "/cadastrar/anuncio",
                requiresAdmin: false,
                text: "Anunciar"
            }, {
                path: "/",
                requiresAdmin: false,
                text: "Catálogo"
            }, {
                path: "/relatorios",
                requiresAdmin: false,
                text: "Relatórios"
            }, {
                path: "/favoritos",
                requiresAdmin: false,
                text: "Favoritos"
            }, {
                path: "/cadastrar/usuario",
                requiresAdmin: true,
                text: "Usuários"
            }, {
                path: "/perfil",
                requiresAdmin: false,
                text: "Perfil"
            }]
        }
    },
    computed: {
        linksDisponiveis() {
            return this.links.filter((link) => {
                const {route} = this.$router.resolve(link.path)

                return (
                    !route.matched.some((record) => record.meta.requiresAdmin) ||
          this.$store.getters.getUser.use_is_admin
                )
            })
        }

    }
}