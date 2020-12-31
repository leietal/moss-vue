<template>
  <iframe
    v-if="fileCode"
    :src="downloadSrc"
    style="display: none"
    title
  ></iframe>
</template>
<script>
import { getDownloadUrl } from "@/services/file";

let timer = null;
export default {
  props: {
    fileCode: String,
  },
  model: {
    prop: "fileCode",
    event: "change",
  },
  data() {
    return {
      downloadSrc: null,
    };
  },
  watch: {
    fileCode: {
      handler(newVal) {
        if (newVal) {
          this.downloadFile(newVal);
        }
      },
      immediate: true,
    },
  },
  methods: {
    downloadFile(val) {
      this.downloadSrc = getDownloadUrl(val);
      setTimeout(() => {
        this.$emit("change", null);
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.downloadFile(this.fileCode);
    });
  },
};
</script>
