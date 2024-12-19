<template>
  <div class="detail-child-wrap">
    <div class="detail-content"
         v-for="(section, index) in sections"
         :key="index"
    >
      <div class="content-image">
        <p>{{ section.title }}</p>
      </div>
      <div class="content-description">
        {{ section.description }} <button @click="editSection(index)">(수정)</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "webDetailChild",
  data() {
    return {

    };
  },
  props: {
    sections: {
      type: Array,
      default() {}
    },
  },
  mounted() {},
  methods: {
    editSection(index) {
      const updatedSections = [...this.sections];
      updatedSections[index].description = "수정된 내용입니다!";

      this.$emit("update-sections", updatedSections);
    },
  },
};
</script>

<style scoped lang="scss">
.detail-child-wrap{
  background: #ffffff;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 12px 12px 60px 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  max-width: 475px;
  width: 100%;
  .detail-content{
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