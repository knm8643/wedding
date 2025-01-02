<template>
  <div class="detail-child-wrap">
    <!-- 디폴트 영역확인용:추후제거 -->
    <div class="detail-content"
         v-for="(section, index) in filteredSections"
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

      <!-- 사진리스트 -->
      <div v-if="section.type === 'photo'">
        <photoDefault
            :section="section"
            :update="true"
            :index="index"
            @edit-section="editSection"
        />
      </div>

      <!-- 달력 -->
      <div v-if="section.type === 'calender'">
        <calenderDefault
            :section="section"
            :update="true"
            :index="index"
            @edit-section="editSection"
        />
      </div>

      <!-- 오시는길 -->
      <div v-if="section.type === 'address'">
        <addressDefault
            :section="section"
            :update="true"
            :index="index"
            @edit-section="editSection"
        />
      </div>

      <!-- 축의금 -->
      <div v-if="section.type === 'giftMoney'">
        <giftDefaultInfo
            :section="section"
            :update="true"
            :index="index"
            @edit-section="editSection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BigBannerDefault from "@/components/bigBanner/BigBannerDefault.vue";
import IntroDefault from "@/components/intro/IntroDefault.vue";
import PhotoDefault from "@/components/photo/PhotoDefault.vue";
import CalenderDefault from "@/components/calender/CalenderDefault.vue";
import AddressDefault from "@/components/address/AddressDefault.vue";
import GiftDefaultInfo from "@/components/gift/GiftDefaultInfo.vue";

export default {
  name: "webDetailChild",
  components: {GiftDefaultInfo, AddressDefault, CalenderDefault, PhotoDefault, IntroDefault, BigBannerDefault},
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
  computed: {
    filteredSections() {
      return this.sections.filter(section => {
        return ['bigBanner', 'intro', 'photo', 'calender','address','giftMoney'].includes(section.type);
      });
    }
  },
  mounted() {
  },
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
  background: rgba(255, 255, 255, 0.8); /* 흰색 반투명 */
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