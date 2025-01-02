<template>
  <div
      class="photo-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="photo"
  >
    <div class="swiper-container">
      <swiper
          space-between="10"
          slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="(image, index) in section.imagePath" :key="index">
          <img :src="image" alt="웨딩 사진" class="photo-image" />
        </swiper-slide>
      </swiper>
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
          <p>연락처 정보를 기입해주세요</p>
          <button @click="closePopup">닫기</button>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";


export default {
  name: "photoDefault",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isVisible: false, // 애니메이션 트리거
      isEditing: false,
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
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
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
.photo-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease, transform 1.2s ease;

  .swiper-container {
    width: 100%;
    height: auto;
    margin: 16px auto 36px;

    .photo-image {
      aspect-ratio: 16 / 9;
      object-fit: cover;
      width: 100%;
    }
  }

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
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.popup p {
  font-size: 18px;
  color: #191c21;
  margin-bottom: 16px;
}

.popup button {
  padding: 4px 16px;
  background-color: #ff91a4;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.3s ease;
}

.popup button:hover {
  background-color: #ff7086;
}
</style>