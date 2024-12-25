<template>
  <div
      class="photo-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="photo"
  >
    <div class="swiper-container">
      <swiper
          :pagination="{
            clickable: true,
            type: 'bullets'
          }"
          loop
          :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }"
          space-between="10"
          slides-per-view="1"
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
    <div class="content-update" v-if="update" >
      <button @click="toggleEdit">
        {{ isEditing ? "저장하기" : "수정하기" }}
      </button>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper"; // Autoplay 모듈 추가
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
    };
  },
  setup() {
    return {
      modules: [Autoplay, Pagination], // 모듈 등록
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
    margin: 16px auto 24px;

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
      p{
        color: #191c21;
        font-weight: 500;
        font-size: 21px;
      }
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

</style>