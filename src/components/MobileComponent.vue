<template>
  <section class="mobile-wrap">
    <div
        class="mobile-content-wrap"
        :class="mobileCheck ? 'onlyMobile' : ''"
    >
      <div
          class="mobile-content"
          v-for="(section, index) in sections"
          :key="index"
      >
        <div class="content-image">
          <p>{{ section.title }}</p>
        </div>
        <div class="content-description">
          {{ section.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "mobileComponent",
  data() {
    return {
    };
  },
  props: {
    sections: {
      type: Array,
      default() {}
    },
    mobileCheck: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.mobile-wrap{
  position: relative;
  .mobile-content-wrap{
    position: absolute;
    right: 0;
    background: #ffffff;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 12px 12px 60px 12px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    max-width: 475px;
    width: 100%;
    .mobile-content {
      margin-bottom: 16px;

      .content-image {
        height: 200px;
        background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.2),
                rgba(0, 0, 0, 0.5)
        );
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      }
      .content-description {
        margin-top: 8px;
        font-size: 16px;
        color: #333;
        text-align: center;
      }
    }
  }
  // 웹으로 들어온 경우가 아닌경우
  .onlyMobile {
    max-width: 100%;
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