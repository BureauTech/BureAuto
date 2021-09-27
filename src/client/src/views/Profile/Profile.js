import axios from "@/axios.js"


export default {
    name: "Profile",

    data: function() {
        return {
            message: "not updated",
            dialog: false              
        }
    },
      
    methods: {
        deleteUser: async function() {
            if (this.$store.getters.isAuthenticated) {
                await axios.delete(`/user/${this.$store.getters.getUser.use_cod}`)
                await axios.get("/logout")
                window.location.href = "/"
            } else {
                this.$router.push({name: "Login"})
            }
        }
    }
}