<template>
  <div
      class="letter-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="letter"
  >

    <div class="click-area">
      <div
          class="envelope"
          :class="{ 'is-open': isContentVisible }"
          @click="toggleContent"
      >
        <!-- 편지 봉투 -->
        <div class="flap">
          <div class="flap-content" v-if="!isContentVisible">
            <span class="flap-text">신랑&신부에게 편지보내기</span>
          </div>
        </div>
        <div class="letter">
          <div class="letter-box">
            <div class="letter-header" >개인편지 전달하기</div>
            <div class="letter-body">
              <input type="text" @click.stop placeholder="보내는분 성함을 적어주세요"/>

              <!-- textarea에 이벤트 차단 -->
              <textarea
                  rows="5"
                  placeholder="여기에 편지를 작성하세요."
                  @click.stop
              ></textarea>
            </div>
            <div class="letter-footer">보내기</div>
          </div>
        </div>
      </div>
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
  name: "letterDefault",
  data() {
    return {
      isContentVisible: false, // 편지가 열리는 상태
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
        { threshold: 0.4 } // 10%가 보이면 트리거
    );

    observer.observe(this.$refs.letter);
  },

  methods: {
    toggleContent() {
      this.isContentVisible = !this.isContentVisible; // 열고 닫기 토글
    },
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
.letter-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  justify-self: center;
  padding: 0 0 42px;
  width: 100%;

  /* 클릭 시 나오는 영역 */
  .click-area {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 20px 0;


    /* 봉투 전체 */
    .envelope {
      width: 100%;
      height: 260px;
      position: relative;
      perspective: 1000px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    /* 봉투 윗면 (플랩) */
    .flap {
      width: 100%;
      height: 100%;
      border: 0.6px solid #b0b0b0;
      background: #fff;
      position: absolute;
      justify-content: center;
      align-items: center;
      display: flex;
      top: 0;
      left: 0;
      transform-origin: left; /* 봉투가 왼쪽에서 열리도록 설정 */
      transform: translateX(0); /* 초기 상태: 왼쪽으로 숨겨짐 */
      transition: transform 0.5s ease-in-out;
      z-index: 2;

      /* 종이 질감 효과 */
      background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(240, 240, 240, 1) 100%
      ),
      url("https://www.transparenttextures.com/patterns/linen.png");
      background-blend-mode: multiply;
      filter: brightness(0.98) contrast(1.02);
    }

    /* 플랩 내용 */
    .flap-content {
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }

    .flap-text {
      display: inline-block;
      background: #ff91a4;
      padding: 6px 12px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      animation: pulse 2s infinite;
    }
    .flap-text:hover {
      background: #ff7086;
    }

    /* 봉투 펼쳐지는 애니메이션 */
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    /* 봉투 펼쳐졌을 때 */
    .envelope.is-open .flap {
      transform: translateX(-100%); /* 왼쪽에서 오른쪽으로 펼쳐짐 */
    }

    /* 편지 속지 */
    .letter {
      width: 100%;
      height: 100%;
      background: #fff;
      border: 0.6px solid #b0b0b0;
      position: absolute;
      top: 0;
      left: 0;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transform: translateX(20px); /* 오른쪽에서 살짝 들어오는 효과 */
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

      /* 종이 질감 효과 */
      background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(240, 240, 240, 1) 100%
      ),
      url("https://www.transparenttextures.com/patterns/linen.png");
      background-blend-mode: multiply;
      filter: brightness(0.98) contrast(1.02);
    }

    /* 편지 내용 스타일 */
    .letter-box {
      line-height: 1.6;
    }

    .letter-header {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .letter-body input {
      width: 100%;
      background: #fff;
      border: 0.6px solid #b0b0b0;
      border-radius: 5px;
      padding: 10px;
      resize: none;
      font-family: inherit;
      font-size: 14px;
    }

    .letter-body textarea {
      width: 100%;
      height: 80px;
      background: #fff;
      border: 0.6px solid #b0b0b0;
      border-radius: 5px;
      padding: 10px;
      resize: none;
      font-family: inherit;
      font-size: 14px;
    }
    .letter-body input:hover,
    .letter-body textarea:hover {
      border: 0.6px solid #ff91a4;
      background: #FFF4F4;
    }

    .letter-footer {
      margin-top: 20px;
      width: 100%;
      padding: 6px 0;
      text-align: center;
      cursor: pointer;
      transition: color 0.3s ease;
      background-color: #ff91a4;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }

    .letter-footer:hover{
      background: #ff7086;
    }

    /* 펼쳐졌을 때 편지 내용 */
    .envelope.is-open .letter {
      opacity: 1;
      transform: translateX(0);
    }
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
.letter-wrap.animate-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>