<template>
  <div class="about">
    <About></About>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import About from "@/components/tmp/About.vue";

@Options({
  components: { About },
})
export default class AboutView extends Vue {}
</script>
