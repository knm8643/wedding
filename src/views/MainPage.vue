<template>
  <div>
    <!-- 모바일 -->
    <MobileComponent/>

    <!-- 웹 -->
    <WebComponent/>
  </div>
</template>

<script>
import MobileComponent from "@/components/MobileComponent.vue";
import WebComponent from "@/components/WebComponent.vue";

export default {
  name: "mainPage",
  components: {WebComponent, MobileComponent},
  data() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">

</style>