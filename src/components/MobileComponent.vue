<template>
  <section class="mobile-wrap">
    <div class="mobile-content-wrap">
      <div
          class="mobile-content"
          v-for="index in 60"
          :key="index"
          style="font-size: 18px"
      >
        모바일영역테스트 {{ index }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "mobileComponent",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.mobile-wrap{
  .mobile-content-wrap{
    background: #ffffff;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 12px 12px 0;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    max-width: 475px;

    /* 플렉스로 부모에서 할경우 다시 주석해제 */
    //flex: 1 1 auto;
    //max-width: calc(50% - 26px);
  }
}

// 스크롤 옵션
.mobile-content-wrap::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.mobile-content-wrap {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>