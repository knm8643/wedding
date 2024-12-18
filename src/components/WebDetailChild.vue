<template>
  <div class="detail-child-wrap">
    <div class="detail-content"
         v-for="index in 60"
         :key="index"
         style="font-size: 18px"
    >
      웹에디터영역테스트 {{ index }}
    </div>
  </div>
</template>

<script>
export default {
  name: "webDetailChild",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.detail-child-wrap{
  background: #ffffff;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 12px 12px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
}

// 스크롤 옵션
.detail-child-wrap::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.detail-child-wrap {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>