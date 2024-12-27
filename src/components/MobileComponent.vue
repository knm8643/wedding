<template>
  <section class="mobile-wrap">
    <div
        class="mobile-content-wrap"
        :class="mobileCheck ? 'onlyMobile' : ''"
    >

      <div class="mobile-content"
           v-for="(section, index) in filteredSections"
           :key="index"
      >

        <!-- 빅배너 -->
        <div v-if="section.type === 'bigBanner'">
          <BigBannerDefault
            :section="section"
            :update="false"
          />
        </div>

        <!-- 인사말 -->
        <div v-if="section.type === 'intro'">
          <introDefault
            :section="section"
            :update="false"
          />
        </div>

        <!-- 사진리스트 -->
        <div v-if="section.type === 'photo'">
          <photoDefault
            :section="section"
            :update="false"
          />
        </div>

        <!-- 달력 -->
        <div v-if="section.type === 'calender'">
          <calenderDefault
            :section="section"
            :update="false"
          />
        </div>

        <!-- 오시는길 -->
        <div v-if="section.type === 'address'">
          <addressDefault
            :section="section"
            :update="false"
          />
        </div>

        <!-- 디폴트 영역확인용:추후제거 -->
        <!--
        <div v-else-if="!['bigBanner','intro','photo'].includes(section.type)">
          <img class="content-image" :src="section.imagePath" alt="섹션 이미지" v-if="section.imagePath" />
          <div class="content-empty-image" v-else>
            <p>{{ section.title }}</p>
          </div>
          <div class="content-description">
            {{ section.description }}
          </div>
        </div>
        -->
      </div>
    </div>
  </section>
</template>

<script>
import BigBannerDefault from "@/components/bigBanner/BigBannerDefault.vue";
import IntroDefault from "@/components/intro/IntroDefault.vue";
import PhotoDefault from "@/components/photo/PhotoDefault.vue";
import CalenderDefault from "@/components/calender/CalenderDefault.vue";
import AddressDefault from "@/components/address/AddressDefault.vue";

export default {
  name: "mobileComponent",
  components:
      {
        CalenderDefault,
        PhotoDefault,
        IntroDefault,
        BigBannerDefault,
        AddressDefault
      },
  data() {
    return {
    };
  },
  computed: {
    filteredSections() {
      return this.sections.filter(section => {
        return ['bigBanner', 'intro', 'photo', 'calender','address'].includes(section.type);
      });
    }
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
    this.addSnowEffect();
  },
  methods: {
    addSnowEffect() {
      // mobile-content-wrap 요소 선택
      const snowContainer = document.querySelector('.mobile-wrap');

      // snow를 추가할 갯수 설정
      const snowCount = 90;

      // 눈 생성
      for (let i = 0; i < snowCount; i++) {
        const snowElement = document.createElement('div');
        snowElement.classList.add('snow');  // 눈에 대한 CSS 클래스 추가
        snowContainer.appendChild(snowElement);
      }
      // 생성된 눈에 랜덤 색 적용
      var snowElements = document.getElementsByClassName('snow');
      for (var j = 0; j < snowElements.length; j++) {
        var snowElement2 = snowElements[j];
        snowElement2.style.setProperty('--snow-color', getRandomColor());
      }

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    },
  }
};
</script>

<style scoped lang="scss">
.mobile-wrap{
  position: relative;
  overflow: hidden;
  .mobile-content-wrap{
    position: absolute;
    right: 0;
    //background: linear-gradient(to bottom, #FFFBF0, #fff); /* 연한 크림색 계열 */
    background: rgba(255, 255, 255, 0.8); /* 흰색 반투명 */


    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 12px 0 24px 0;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    max-width: 475px;
    width: 100%;
    .mobile-content {
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