<script>
import {BrowserMultiFormatReader, Exception, MultiFormatReader, BarcodeFormat, DecodeHintType} from "@zxing/library";
export default {
  name: "scanner",
  data() {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported: navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices,
    };
  },

  mounted() {
    console.log(this.isMediaStreamAPISupported)
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
    }

    this.start();
    this.$refs.scanner.oncanplay = (event) => {
      this.isLoading = false;
      this.$emit("loaded");
    };
  },

  beforeUnmount() {
    this.codeReader.reset();
  },

  methods: {
    start() {
      const hints = new Map();
      const formats = [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.CODE_128,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.AZTEC,
        BarcodeFormat.EAN_8,
        BarcodeFormat.CODE_93,
        BarcodeFormat.UPC_E,
        BarcodeFormat.EAN_13
      ]
      // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      hints.set(DecodeHintType.TRY_HARDER, true);
      this.codeReader.hints = hints;
      console.log(this.codeReader.hints)
      this.codeReader.decodeFromVideoDevice(undefined, this.$refs.scanner, (result, err) => {
        if (result) {
          this.$emit("decode", result.text);
          this.$emit("result", result);
          this.reset()
        }

        if (err) {
          // console.log(err)
        }
      });
    },
    reset() {
      this.codeReader.reset();
    }
  },
}
</script>

<template>
  <div class="scanner-container">
    <div v-show="!isLoading">
      <video poster="data:image/gif,AAAA" ref="scanner"></video>
      <div class="overlay-element"></div>
      <div class="laser"></div>
    </div>
  </div>
</template>

<style scoped>
video {
  max-width: 100%;
  max-height: 100%;
}
.scanner-container {
  position: relative;
}

.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 99%;
  background: rgba(30, 30, 30, 0.5);

  -webkit-clip-path: polygon(0% 0%, 0% 100%, 20% 100%, 20% 20%, 80% 20%, 80% 80%, 20% 80%, 20% 100%, 100% 100%, 100% 0%);
  clip-path: polygon(0% 0%, 0% 100%, 20% 100%, 20% 20%, 80% 20%, 80% 80%, 20% 80%, 20% 100%, 100% 100%, 100% 0%);
}

.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}
@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
</style>e>
