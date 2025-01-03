<template>
  <div
      class="intro-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="intro"
  >

    <div class="scroll-line" :class="{ 'line-visible': isVisible }"></div>
    <!-- 타이틀 제목 -->
    <div class="content-title">
      {{section.title}}
    </div>


    <!-- 저작권 표시 -->
    <div class="content">
      <p style="font-style: italic; font-size: 12px; color: #999; text-align: center; padding: 24px">
        아름다운 세상 그대에게 보여주리 말해봐요<br/> 그대가 보고 싶은 것들을
      </p>
    </div>

    <!-- 내용 -->
    <div class="content">
      <p>
        사랑이 결실을 맺어 저희 두 사람이
      </p>
      <p>
        새로운 시작을 함께 하려 합니다.
      </p>
      <p>
        기쁜 마음으로 이 특별한 날에
      </p>
      <p>
        소중한 분들을 모시고자 하오니
      </p>
      <p>
        부디 오셔서 축복해 주시고
      </p>
      <p>
        자리를 빛내 주시면 감사하겠습니다.
      </p>
      <p>
        따뜻한 환영과 함께 여러분을 기다리겠습니다.
      </p>
    </div>

    <div class="content-update" v-if="update" >
      <button @click="toggleEdit">
        {{ isEditing ? "저장하기" : "수정하기" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "introDefault",
  data() {
    return {
      isVisible: false, // 애니메이션 트리거
      isEditing: false,
      editedSection: {}, // 수정된 데이터
    };
  },
  props: {
    section: {
      type: [Array, Object],
      default: () => ([]),
    },
    update:{
      type: Boolean,
    },
    index:{
      type: Number
    }
  },
  mounted() {
    this.editedSection = JSON.parse(JSON.stringify(this.section)); // 데이터 복사
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible = true; // 애니메이션 활성화
            observer.disconnect(); // 중복 실행 방지
          }
        },
        { threshold: 0.1 } // 10%가 보이면 트리거
    );

    observer.observe(this.$refs.intro);
  },

  methods: {
    toggleEdit() {
      if (this.isEditing) {
        // 저장 버튼 클릭 시 부모로 변경된 데이터 전달
        this.$emit("edit-section", this.index, this.editedSection);
      }
      this.isEditing = !this.isEditing;
    },
  },
};
</script>
<style scoped>
/* 애니메이션 */
.intro-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  justify-self: center;
  padding-bottom: 32px;

  /* 스크롤 라인 */
  .scroll-line {
    margin: 0 auto;
    width: 0.6px;
    height: 0;
    background: #191c21;
    border-radius: 2px;
    transition: height 1.5s ease;
  }

  .scroll-line.line-visible {
    height: 52px;
  }

  .content-title {
    color: #191c21;
    font-weight: 700;
    font-size: 21px;
    text-align: center;
    padding-top: 32px;
  }

  /* 컨텐츠 영역 */
  .content {
    padding: 24px 24px 0;
  }

  .content p {
    white-space: nowrap;
    color: #191c21;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 6px; /* 내용 블록 아래 간격 추가 */
  }

  /* 저작권 텍스트 */
  .content p[style*="font-style: italic"] {
    font-size: 12px;
    color: #999;
  }

  .content-update{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding-top: 16px;
    button {
      font-size: 18px;
      font-weight: 500;
    }
    button:hover {
      font-size: 19px;
      font-weight: 700;
    }
  }

}

.intro-wrap.animate-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 인풋박스 공통 */
input {
  text-align: center;
  width: 100%;
  font-size: 14px;
}
input:hover{
  border: 0.6px solid #b0b0b0;
}
</style>