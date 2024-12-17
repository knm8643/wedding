<template>
  <div class="main-wrapper">
    <MobileComponent v-if="isMobile" />

    <template v-else>
      <!-- 웹 환경: 둘 다 표시 -->
      <MobileComponent />
      <WebComponent />
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
    };
  },
  mounted() {
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

%c
Copyright (c) 충림이 All rights reserved.
    `,
'font-size: 14px; color: #FFB6C1; font-weight: bold;',
'font-size: 14px; color: #FFFFFF; font-weight: 500;',
'font-size: 12px; color: #FFFFFF; font-weight: 500;',
'font-size: 12px; color: #FFFFFF; font-style: italic;'
    );
    this.detectDevice();
  },
  methods: {
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

<style lang="scss">
// 메인박스
.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  height: 100%;
  background-color: #F8F8F8;
}
</style>