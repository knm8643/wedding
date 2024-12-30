<template>
  <div
      class="calender-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="calender"
  >

    <div class="scroll-line" :class="{ 'line-visible': isVisible }"></div>

    <div class="calender-main-font">
      <p>{{ section.daysfont }}</p>
      <span>{{ section.time }} 예식이 시작됩니다.</span>
    </div>

    <div class="calender-main-wrap">
      <calenderTemplate
        :days="section.days"
      />
    </div>

    <div class="content-update" v-if="update" >
      <button @click="toggleEdit">
        {{ isEditing ? "저장하기" : "수정하기" }}
      </button>
    </div>
  </div>
</template>

<script>
import CalenderTemplate from "@/components/calender/CalenderTemplate.vue";

export default {
  name: "calenderDefault",
  components: {CalenderTemplate},
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

    observer.observe(this.$refs.calender);
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
.calender-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  justify-self: center;
  padding: 32px 0;
  width: 100%;

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

  .calender-main-font{
    text-align: center;
    padding: 42px 0 24px;
    font-size: 18px;
    font-weight: 400;
    span{
      color: #6a6a6a;
    }

    p{
      padding-bottom: 4px;
      color:  #191c21;
      font-weight: 500;
    }
  }

  .calender-main-wrap {
    margin: 24px 44px;
    padding-bottom: 12px;
    border-radius: 4px;
    border-top: 0.6px solid #b0b0b0;
    border-bottom: 0.6px solid #b0b0b0;
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

.calender-wrap.animate-visible {
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