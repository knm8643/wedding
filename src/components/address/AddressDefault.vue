<template>
  <div
      class="address-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="address"
  >
    <div class="address-main-font">
      <p>{{ section.title }}</p>
      <span>{{ section.description }}</span>
    </div>

    <div class="address-map">
      <div id="map" ref="map" style="width: 100%; height: 300px;"></div>
    </div>

    <!-- 내비게이션 버튼을 마크업에서 미리 정의 -->
    <div class="address-nav-wrap">
      <button @click="startNavigation">카카오 내비게이션 테스트중</button>
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
  name: "addressDefault",
  data() {
    return {
      isVisible: false, // 애니메이션 트리거
      isEditing: false,
      editedSection: {}, // 수정된 데이터
      map: null, // 카카오맵 객체
      geocoder: null, // Geocoder 객체
      latitude: '',
      longitude: '',
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
        { threshold: 0.3 } // 10%가 보이면 트리거
    );

    observer.observe(this.$refs.address);
    this.initKakaoMap();
  },

  methods: {
    // 내비게이션 실행
    startNavigation() {
      const lat = this.latitude;  // 목적지 위도
      const lng = this.longitude; // 목적지 경도
      const name = this.section.description;    // 목적지 이름 (옵션)

      const kakaoNaviUrl = `kakaonavi://navigate?lat=${lat}&lon=${lng}&name=${encodeURIComponent(name)}`;
      const fallbackUrl = `https://play.google.com/store/apps/details?id=com.kakao.taxi`; // 카카오내비 앱 다운로드 페이지

      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        setTimeout(() => {
          // 앱이 열리지 않으면 구글 플레이 스토어로 이동
          window.location.href = kakaoNaviUrl;

          // 1초 후, 앱이 열리지 않으면 구글 플레이로 리디렉션
          setTimeout(() => {
            window.location.href = fallbackUrl;
          }, 1000);
        }, 500);
      } else {
        alert('모바일 기기에서만 내비게이션을 사용할 수 있습니다.');
      }
    },

    toggleEdit() {
      if (this.isEditing) {
        // 저장 버튼 클릭 시 부모로 변경된 데이터 전달
        this.$emit("edit-section", this.index, this.editedSection);
      }
      this.isEditing = !this.isEditing;
    },

    initKakaoMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
          };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      const param = this.section.description

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(param, function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          this.latitude = coords.getLat();  // 위도
          this.longitude = coords.getLng(); // 경도

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:2px 0;">예식장</div>'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }.bind(this));
    },
  },
};
</script>
<style scoped>
/* 애니메이션 */
.address-wrap {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  justify-self: center;
  padding: 0 0 42px;
  width: 100%;

  .address-main-font{
    padding: 0 0 42px;
    text-align: center;
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

  .address-nav-wrap{
    text-align: center;
    padding: 24px;
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

.address-wrap.animate-visible {
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