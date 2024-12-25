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
      sections: [
        {
          type: "bigBanner",
          title: "메인사진",
          description:
              [{
                userName_1:"충디딥",
                userName_2:"유디딥",
                infoDate:"2025.02.08 토요일 13시",
                infoMonthDay:"2025.02.08",
                weddingHall:"서울시 용산구 용산동1가 로얄파크컨벤션"
              }],
          imagePath: require("@/assets/img/banner/main-img-3.png")
        },
        {
          type: "intro" ,
          title: "저희 결혼합니다",
          description: [{
            line_1: "저희 두 사람이 새로운 출발을 결심했습니다.",
            line_2: "함께 기쁨을 나눠주신다면 감사하겠습니다.",
            line_3: "앞으로의 여정을 따뜻히 지켜봐 주세요."
          }]
        },
        {
          type: "photo", title: "사진목록",
          description: [{
            userInfo_1: "홍길동",
            userInfo_2: "문익점",
            userInfo_3: "충디딥",
            userInfo_4: "김두환",
            userInfo_5: "유디딥",
            userInfo_6: "충디딥",
          }],
          imagePath: [
            require("@/assets/img/banner/main-img-4.png"),
            require("@/assets/img/banner/main-img-1.png"),
          ]
        },
        { type: "calender", title: "달력", days: "2025.02.08 13:00" },
        { type: "map", title: "지도", description: "예식장 주변 지도입니다." },
        { type: "address", title: "오시는 길", description: "예식장 위치 정보입니다." },
        { type: "giftMoney", title: "축의금", description: "축의금 계좌 정보입니다." },
        { type: "letter", title: "편지", description: "축복의 메시지를 남겨주세요." }
      ]
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