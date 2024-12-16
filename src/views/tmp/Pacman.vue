<template>
  <div class="pacman">
    <pacman></pacman>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import pacman from "@/components/tmp/PacManComponent.vue";

@Options({
  components: { pacman },
})
export default class pacmanView extends Vue {}
</script>
