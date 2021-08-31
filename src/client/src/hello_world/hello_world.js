let hello = new Vue({
  el: "#hello",
  data: {
    teste: 1
  },
  mounted() {
    this.teste += 1
  },
  computed: {},
  watch: {},
  methods: {}
})