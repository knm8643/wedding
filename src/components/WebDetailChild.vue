<template>
  <div class="detail-child-wrap">
    <!-- 디폴트 영역확인용:추후제거 -->
    <div class="detail-content"
         v-for="(section, index) in sections"
         :key="index"
    >
      <!-- 빅배너 -->
      <div v-if="section.type === 'bigBanner'">
        <BigBannerDefault
            :section="section"
            :update="true"
            :index="index"
            @edit-section="editSection"
        />
      </div>

      <!-- 인사말 -->
      <div v-if="section.type === 'intro'">
        <introDefault
            :section="section"
            :update="true"
            :index="index"
            @edit-section="editSection"
        />
      </div>

      <!-- 디폴트 영역확인용:추후제거 -->
      <div v-else-if="!['bigBanner','intro'].includes(section.type)">
        <img class="content-image" :src="section.imagePath" alt="섹션 이미지" v-if="section.imagePath" />
        <div class="content-empty-image" v-else>
          <p>{{ section.title }}</p>
        </div>
        <div class="content-description">
          {{ section.description }} <button @click="editSection(index)">(수정)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigBannerDefault from "@/components/bigBanner/BigBannerDefault.vue";
import IntroDefault from "@/components/intro/IntroDefault.vue";

export default {
  name: "webDetailChild",
  components: {IntroDefault, BigBannerDefault},
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
    editSection(index, params) {
      const updatedSections = [...this.sections];
      updatedSections[index] = params;
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
  padding: 24px 0 24px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  max-width: 475px;
  width: 100%;
  .detail-content{
    margin-bottom: 16px;

    .content-image{
      height: 100%;
      width: 100%;
    }

    .content-empty-image {
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