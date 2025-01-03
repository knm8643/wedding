<template>
  <section class="mobile-wrap">
    <!-- 첫 번째 화면 -->
    <div v-if="showIntro" class="main-intro-wrap" :class="!showIntro ? 'hide':''">
        <p class="typing-text" >&nbsp;{{ typingText }}</p>
    </div>

    <!-- 메인 콘텐츠 -->
    <div
        v-else
        class="mobile-content-wrap"
        :class="mobileCheck ? 'onlyMobile' : ''"
    >
      <div
          class="mobile-content"
          v-for="(section, index) in filteredSections"
          :key="index"
      >
        <div v-if="section.type === 'bigBanner'">
          <BigBannerDefault :section="section" :update="false" />
        </div>
        <div v-if="section.type === 'intro'">
          <introDefault :section="section" :update="false" />
        </div>
        <div v-if="section.type === 'photo'">
          <photoDefault :section="section" :update="false" />
        </div>
        <div v-if="section.type === 'calender'">
          <calenderDefault :section="section" :update="false" />
        </div>
        <div v-if="section.type === 'address'">
          <addressDefault :section="section" :update="false" />
        </div>
        <div v-if="section.type === 'giftMoney'">
          <giftDefaultInfo :section="section" :update="false" />
        </div>
        <div v-if="section.type === 'letter'">
          <letterDefault :section="section" :update="false"/>
        </div>
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
import GiftDefaultInfo from "@/components/gift/GiftDefaultInfo.vue";
import LetterDefault from "@/components/letter/LetterDefault.vue";

export default {
  name: "mobileComponent",
  components:
      {
        LetterDefault,
        GiftDefaultInfo,
        CalenderDefault,
        PhotoDefault,
        IntroDefault,
        BigBannerDefault,
        AddressDefault
      },
  data() {
    return {
      showIntro: true, // 첫 화면 표시 여부
      fullText: "저희의 결혼식에 초대합니다", // 타이핑 효과에 사용할 텍스트
      TextTwo: '',
      typingText: "", // 현재 보여질 텍스트
      typingTextTwo: false,
      typingIndex: 0, // 타이핑 중인 글자 인덱스
    };
  },
  computed: {
    filteredSections() {
      return this.sections.filter(section => {
        return ['bigBanner', 'intro', 'photo', 'calender','address','giftMoney','letter'].includes(section.type);
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
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.typingIndex < this.fullText.length) {
        this.typingText += this.fullText[this.typingIndex];
        this.typingIndex++;
        setTimeout(this.typeText, 50); // 타이핑 속도 조절 (100ms 간격)
      } else {
        setTimeout(() => {
          this.showIntro = false; // 타이핑이 끝난 후 첫 화면 숨김
          this.addSnowEffect();
        }, 800); // 1초 대기 후 화면 전환
      }
    },
    addSnowEffect() {
      // mobile-content-wrap 요소 선택
      const snowContainer = document.querySelector('.mobile-wrap');

      // snow를 추가할 갯수 설정
      const snowCount = 80;

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

// 타이핑효과
.main-intro-wrap {
  padding-top: 12px;
  padding-left: 12px;
  height: 100vh;
  background-color: black;
  z-index: 1000;
  opacity: 1;
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
  visibility: visible;
  display: flex;
  position: absolute;
  right: 0;
  max-width: 475px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.main-intro-wrap.hide {
  opacity: 0;
  visibility: hidden;
}

.typing-text {
  font-size: 21px;
  font-weight: bold;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid #FFFFFF;
  animation: blink 0.7s steps(2, start) infinite;
}

@keyframes blink {
  0% {
    border-right-color: #FFFFFF;
  }
  50% {
    border-right-color: transparent;
  }
  100% {
    border-right-color: #FFFFFF;
  }
}

</style>