<template>
  <div
      class="photo-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="photo"
  >
    <div class="swiper-container">
      <div class="main-image-wrap">
        <img
            :src="selectedImage"
            alt="대표 이미지"
            class="main-image"
        >
      </div>

      <!-- 이미지 리스트 -->
      <div class="img-wrap">
        <img
            v-for="(image, index) in section.imagePath"
            :key="index"
            :src="image"
            :class="{ selected: selectedIndex === index }"
            @click="selectImage(index, $event)"
            class="photo-image"
        >
      </div>
    </div>
    <div class="content-fmInfo">
      <div class="fmInfo">
        <p>{{ section.description[0]?.userInfo_1 }} · {{ section.description[0]?.userInfo_2 }}</p>
        <span>의 아들</span>
        <p>{{ section.description[0]?.userInfo_3 }}</p>
      </div>
      <div class="fmInfo">
        <p>{{ section.description[0]?.userInfo_4 }}</p>
        <span>의 딸</span>
        <p>{{ section.description[0]?.userInfo_5 }}</p>
      </div>
    </div>

    <!-- 전화번호 영역 -->
    <div class="phone-info">
      <button @click="openPopup">연락처 확인</button>
    </div>

    <!-- 팝업 영역 -->
    <teleport to="body">
      <div v-if="showPopup" class="popup-overlay">
        <div class="popup">
          <!-- 신랑측 -->
          <div class="pop-wrap">
            <h3>&lt;신랑측&gt;</h3>
            <div class="pop-sub-wrap">
              <span>신랑에게 연락하기</span>
              <p>
                <!-- 전화 아이콘 -->
                <a :href="'tel:' + section.numbers[0]?.userInfo_1" class="contact-link">
                  <i class="fas fa-phone-alt"></i>
                </a>
                <!-- 문자 아이콘 -->
                <a :href="'sms:' + section.numbers[0]?.userInfo_1" class="contact-link">
                  <i class="fas fa-sms"></i>
                </a>
              </p>
            </div>
            <div class="pop-sub-wrap">
              <span>신랑측 혼주 아버지 연락하기</span>
              <p>
                <!-- 전화 아이콘 -->
                <a :href="'tel:' + section.numbers[0]?.userInfo_2" class="contact-link">
                  <i class="fas fa-phone-alt"></i>
                </a>
                <!-- 문자 아이콘 -->
                <a :href="'sms:' + section.numbers[0]?.userInfo_2" class="contact-link">
                  <i class="fas fa-sms"></i>
                </a>
              </p>
            </div>
            <div class="pop-sub-wrap">
              <span>신랑측 혼주 어머니 연락하기</span>
              <p>
                <!-- 전화 아이콘 -->
                <a :href="'tel:' + section.numbers[0]?.userInfo_3" class="contact-link">
                  <i class="fas fa-phone-alt"></i>
                </a>
                <!-- 문자 아이콘 -->
                <a :href="'sms:' + section.numbers[0]?.userInfo_3" class="contact-link">
                  <i class="fas fa-sms"></i>
                </a>
              </p>
            </div>
          </div>

          <!-- 신부측 -->
          <div class="pop-wrap">
            <h3>&lt;신부측&gt;</h3>
            <div class="pop-sub-wrap">
              <span>신부에게 연락하기</span>
              <p>
                <!-- 전화 아이콘 -->
                <a :href="'tel:' + section.numbers[0]?.userInfo_1" class="contact-link">
                  <i class="fas fa-phone-alt"></i>
                </a>
                <!-- 문자 아이콘 -->
                <a :href="'sms:' + section.numbers[0]?.userInfo_1" class="contact-link">
                  <i class="fas fa-sms"></i>
                </a>
              </p>
            </div>
            <div class="pop-sub-wrap">
              <span>신부측 혼주 어머니 연락하기</span>
              <p>
                <!-- 전화 아이콘 -->
                <a :href="'tel:' + section.numbers[0]?.userInfo_3" class="contact-link">
                  <i class="fas fa-phone-alt"></i>
                </a>
                <!-- 문자 아이콘 -->
                <a :href="'sms:' + section.numbers[0]?.userInfo_3" class="contact-link">
                  <i class="fas fa-sms"></i>
                </a>
              </p>
            </div>
          </div>

          <!-- 닫기 버튼 -->
          <p class="close-popup" @click="closePopup">닫기</p>
        </div>
      </div>
    </teleport>

    <div class="content-update" v-if="update" >
      <button @click="toggleEdit">
        {{ isEditing ? "저장하기" : "수정하기" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "photoDefault",
  data() {
    return {
      isVisible: false, // 애니메이션 트리거
      isEditing: false,
      selectedIndex: 0,
      editedSection: {}, // 수정된 데이터
      showPopup: false, // 팝업 상태
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
  computed: {
    selectedImage() {
      // 선택된 이미지를 대표 이미지로 표시
      return this.section.imagePath[this.selectedIndex];
    },
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
        { threshold: 0.2 } // 20%가 보이면 트리거
    );

    observer.observe(this.$refs.photo);
  },
  methods: {
    selectImage(index, event) {
      this.selectedIndex = index;
      this.selectedImage = this.section.imagePath[index];

      const target = event.target; // 클릭된 이미지 요소
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    toggleEdit() {
      if (this.isEditing) {
        this.$emit("edit-section", this.index, this.editedSection);
      }
      this.isEditing = !this.isEditing;
    }
  },
};
</script>
<style scoped>
/* 애니메이션 */
.photo-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease, transform 1.2s ease;


  /* 이미지 영역 */
  .swiper-container {
    width: 100%;
    height: auto;
    margin: 16px auto 36px;

    .main-image-wrap{
      .main-image{
        border: 0.6px solid #b0b0b0;
        height: 375px;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        width: 100%;
      }
    }

    .img-wrap{
      display: flex;
      overflow-x: scroll;
      scroll-behavior: smooth; /* 부드러운 스크롤 */
      .photo-image {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        width: 30%;
        height: 116px;
        border: 2px solid transparent;
      }
      .selected {
        border-color: #ff91a4; /* 강조 테두리 색상 */
      }
    }
  }
  /* 이미지 영역 */

  .content-fmInfo{
    margin: 0 auto;
    .fmInfo {
      display: flex;
      justify-content: center;
      line-height: 1.8;
      gap: 4px;
      align-items: center;
      padding-top: 4px;
      /*
      cursor: pointer;

       */
      p{
        color: #191c21;
        font-weight: 500;
        font-size: 21px;
        transition: font-size 0.2s ease;
      }
      /*
      p:hover {
        font-size: 22px;
        color: #FF91A4;
        text-decoration: underline;
      }
       */
      span {
        color: #b0b0b0;
        font-weight: 500;
        font-size: 16px;
        line-height: 1.8;
      }
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

.photo-wrap.animate-visible {
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

/* 스와이퍼 */
::v-deep(.swiper-pagination) {
  display: block !important;
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  z-index: 10;
}

::v-deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: #fff;
  opacity: 0.7;
  margin: 0 5px;
}

::v-deep(.swiper-pagination-bullet-active) {
  background: #007bff; /* 활성화된 버튼 색상 */
  opacity: 1;
}

/* 팝업관련 CSS */

.phone-info {
  text-align: center;
  button {
    margin-top: 16px;
    padding: 4px 16px;
    background-color: #ff91a4;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #ff7086;
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  .pop-wrap{
    padding-bottom: 12px;
    h3{
      font-weight: 700;
      font-size: 18px;
      padding-bottom: 12px;
    }

    .pop-sub-wrap{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding-bottom: 12px;

      p{
        display: flex;
        gap: 12px;
        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 10px 0;
          color: #E57373;
          font-size: 16px;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: #ff91a4;
        }

        .contact-link i {
          font-size: 18px;
        }
      }

      span{
        font-weight: 500;
        color: #757575;
        font-size: 16px;
      }

    }
  }
}

.close-popup {
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

.close-popup:hover {
  background-color: #E57373;
}
</style>