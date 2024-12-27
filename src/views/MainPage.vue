<template>
  <div class="main-wrapper">
    <MobileComponent :mobileCheck="isMobile" v-if="isMobile" :sections="sections"/>

    <template v-else>
      <!-- 웹 환경: 둘 다 표시 -->
      <MobileComponent
          :sections="sections"
      />
      <transition name="fade">
        <WebComponent v-if="isShowWebComponent"
                      :sections="sections"
                      @update-sections="updateSections"
        />
      </transition>
    </template>
  </div>
</template>

<script>
import MobileComponent from "@/components/MobileComponent.vue";
import WebComponent from "@/components/WebComponent.vue";

export default {
  name: "mainPage",
  components: { WebComponent, MobileComponent },
  data() {
    return {
      isMobile: false,
      isShowWebComponent: false,
      sections: []
    };
  },

  mounted() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDarkMode ? '#FFFFFF' : '#000000';
    console.log(
    `
%c
 /\\__ /\\
( o   o )
(   '   )  ~♥
( \\     \\
(_____)___)  ~♥

%c
해당 사이트는 개인이 만든 서비스로 누구나 \n자유롭게 이용이 가능한 공간입니다.
%c
※ 해당 사이트는 사용자 접속통계를 저장합니다.
※ 문의 knm8643@nate.com
%c
Copyright (c) 충림이 All rights reserved.
`,
'font-size: 14px; color: #FFB6C1; font-weight: bold;',
`font-size: 14px; color: ${textColor}; font-weight: 500;`,
`font-size: 12px; color: ${textColor}; font-weight: 500;`,
`font-size: 12px; color: ${textColor}; font-style: italic;`
    );
    this.isShowWebComponent = true; // 애니메이션 시작효과
    this.detectDevice();
    this.loadSections();
  },
  methods: {
    updateSections(updatedSections) {
      this.sections = updatedSections;
    },
    detectDevice() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // iOS 또는 Android인 경우
      if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
        this.isMobile = true; // 모바일 환경
      } else {
        this.isMobile = false; // 웹 환경
      }
    },

    async loadSections() {
      try {
        const response = await fetch('/assets/json/knm8643.json');
        const data = await response.json();
        this.sections = data.sections;
      } catch (error) {
        console.error('JSON 데이터를 불러오는 중 에러가 발생했습니다:', error);
      }
    }
  },
};
</script>

<style scoped lang="scss">
// 메인박스
.main-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 46px;
  height: 100%;
  background: linear-gradient(135deg, #F9F5F6, #F4EFEF);
  background-size: 400% 400%;
  animation: moveBackground 10s infinite;

  @keyframes moveBackground {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}


// 해당 메인페이지 전용 애니메이션
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>