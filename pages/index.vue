<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
      </v-card>
      <v-card>
        <v-card-text>
          <Scanner v-if="isCameraActive" @decode="onDecode" @result="onResult" @error="onError" ref="scannerComponent"></Scanner>
          <div class="text-center">
            <p v-if="resultText !== null">{{resultText}}</p>
            <v-btn
              :color="color"
              @click="activateCamera"
            >
              {{ isCameraActive ? 'Cancel' : 'Scan'}}
            </v-btn>
          </div>
          <hr class="my-3">
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Scanner from "~/components/Scanner.vue";
export default {
  name: 'IndexPage',
  components: {
    Scanner
  },
  data() {
    return {
      isCameraActive: false,
      color: "primary",
      resultText: null
    }
  },
  methods: {
    onDecode (result) {
      this.isCameraActive = !this.isCameraActive
      this.resultText = result
      this.$store.dispatch('items/addData', result)
    },
    onResult (result) {
      console.log(result)
    },
    onError (error) {
      console.error(error)
    },
    activateCamera () {
      this.isCameraActive = !this.isCameraActive
      this.color = this.isCameraActive ? "red" : "primary"
      if (this.isCameraActive === false) {
        this.$refs.scannerComponent.reset()
      }

      if (this.isCameraActive) {
        this.resultText = null
      }
    }
  }
}
</script>
