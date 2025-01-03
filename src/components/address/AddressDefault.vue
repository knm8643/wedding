<template>
  <div
      class="address-wrap"
      :class="{ 'animate-visible': isVisible }"
      ref="address"
  >

    <div class="address-main-font">
      <p>{{ section.title }}</p>
      <span>{{ section.description }}</span><br/>
      <span>{{section.mainInfo}}</span>
    </div>

    <div class="address-map">
      <div id="map" ref="map" style="width: 100%; height: 300px;"></div>
    </div>

    <!-- 내비게이션 버튼을 마크업에서 미리 정의 -->
    <div class="address-nav-wrap">
      <div class="kakao-wrap">
        <div class="kakao-main">
          <a id="start-navigation" @click="startNavigation('kakao')">
            <img src="https://developers.kakao.com/assets/img/about/buttons/navi/kakaonavi_btn_medium.png"
                 alt="길 안내하기 버튼" />
          </a>
          <button @click="startNavigation('kakao')">카카오내비</button>
        </div>
        <div class="google-main">
          <a @click="startNavigation('google')">
            <img src="../../assets/img/icon/google.png" alt="google">
          </a>
          <button @click="startNavigation('google')">구글길안내</button>
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
    startNavigation(param) {
      const lat = this.latitude;  // 목적지 위도
      const lng = this.longitude; // 목적지 경도
      const name = this.section.description;    // 목적지 이름 (옵션)

      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {

        if(param === 'kakao') {
          // 카카오 SDK가 로드되었는지 확인
          if (typeof window.Kakao !== 'undefined' && window.Kakao.Navi) {
            // 카카오 내비게이션 호출
            window.Kakao.Navi.start({
              name: name,            // 목적지 이름
              x: lng,                // 경도
              y: lat,                // 위도
              coordType: 'wgs84',    // 좌표 시스템 (WGS84)
            });
          } else {
            alert('카카오 내비 SDK가 로드되지 않았습니다.');
          }
        } else {
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
          window.location.href = googleMapsUrl;
        }
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
          // var infowindow = new kakao.maps.InfoWindow({
          //   content: '<div style="width:150px;text-align:center;padding:2px 0;">예식장</div>'
          // });
          // infowindow.open(map, marker);

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
      white-space: nowrap;
    }

    p{
      padding-bottom: 9px;
      color:  #191c21;
      font-size: 21px;
      font-weight: 700;
    }
  }

  .address-map {
    padding: 0 24px;
    #map{
      border: 1px solid #b0b0b0;
    }
  }

  .address-nav-wrap{
    padding: 24px 24px;
    position: relative;
    .kakao-wrap {
      font-size: 14px;
      gap: 12px;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      display: flex;

      .google-main,
      .kakao-main{
        border: 1px solid #b0b0b0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        border-radius: 8px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: transform 0.2s ease, box-shadow 0.2s ease; /* 부드러운 애니메이션 */

        a {
          img {
            padding-top: 4px;
            width: 24px;
            height: 100%;
          }
        }

        button {
          height: 100%;
        }


        &:hover {
          transform: scale(1.05); /* 살짝 커지게 설정 */
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* 그림자 강화 */
        }
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