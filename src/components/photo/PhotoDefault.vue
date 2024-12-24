<template>
  <div
      class="photo-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="banner"
  >
    <div class="swiper-container">
      <swiper
          :pagination="{
            clickable: true,
            type: 'bullets'
          }"
          loop
          space-between="10"
          slides-per-view="1"
      >
        <swiper-slide v-for="(image, index) in section.imagePath" :key="index">
          <img :src="image" alt="웨딩 사진" class="photo-image" />
        </swiper-slide>
      </swiper>
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
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";

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

    observer.observe(this.$refs.banner);
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
    border: 0.6px solid #b0b0b0;
    width: 100%;
    height: auto;
    margin: 16px auto;

    .photo-image {
      aspect-ratio: 16 / 9;
      object-fit: cover;
      width: 100%;
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