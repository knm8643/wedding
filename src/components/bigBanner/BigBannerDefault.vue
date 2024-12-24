<template>
  <div
      class="banner-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="banner"
  >
    <div class="content-main-font">
      <p v-if="!isEditing">{{ section.description[0]?.infoMonthDay }}</p>
      <input
          v-else
          type="text"
          v-model="editedSection.description[0].infoMonthDay"
      />
    </div>

    <div class="image-wrap" v-if="section.imagePath">
      <img class="content-image" :src="section.imagePath" alt="섹션 이미지" />
    </div>
    <div class="content-empty-image" v-else>
      <p v-if="!isEditing">{{ section.title }}</p>
      <input v-else type="text" v-model="editedSection.title" />
    </div>

    <div class="content-description">
      <div class="description-header">
        <h2 v-if="!isEditing">{{ section.description[0]?.userName_1 }}</h2>
        <input
            v-else
            type="text"
            v-model="editedSection.description[0].userName_1"
        />
        <p>그리고</p>
        <h2 v-if="!isEditing">{{ section.description[0]?.userName_2 }}</h2>
        <input
            v-else
            type="text"
            v-model="editedSection.description[0].userName_2"
        />
      </div>
      <div class="description-info">
        <p v-if="!isEditing">{{ section.description[0]?.infoDate }}</p>
        <input
            v-else
            type="text"
            v-model="editedSection.description[0].infoDate"
        />
        <span v-if="!isEditing">{{ section.description[0]?.weddingHall }}</span>
        <input
            v-else
            type="text"
            v-model="editedSection.description[0].weddingHall"
        />
      </div>
      <div class="content-update" v-if="update" >
        <button @click="toggleEdit">
          {{ isEditing ? "저장하기" : "수정하기" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bigBannerDefault",
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
.banner-wrap{
  border-radius: 4px;
  border: 0.6px solid #b0b0b0;
  margin: 24px;
  padding: 52px 0 64px;

  .content-main-font{
    justify-self: center;
    padding-bottom: 4px;
    border-bottom: 0.6px solid #b0b0b0;
    p{
      color: #191c21;
      font-weight: 400;
      font-size: 21px;
    }
  }

  .image-wrap{
    padding: 32px 0;
    overflow: hidden;

    .content-image {
      border-radius: 4px;
      /*
      border: 0.6px solid #b0b0b0;
       */
      height: 100%;
      width: 100%;
    }
  }

  .content-empty-image {
    height: 200px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.5)
    );
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .content-description {
    margin-top: 8px;
    font-size: 16px;
    color: #333;
    text-align: center;

    .description-header{
      gap: 14px;
      justify-content: center;
      display: flex;
      align-items: flex-end;
      font-weight: 500;
      padding-bottom: 16px;
      h2{
        font-size: 21px;
        color: #191c21;
      }
      p{
        color: #b0b0b0;
      }
    }

    .description-info {
      color: #191c21;
      p{
        padding-bottom: 4px;
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

/* 애니메이션 */
.banner-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.banner-wrap.animate-visible {
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