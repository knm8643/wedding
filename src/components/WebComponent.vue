<template>
  <section class="web-wrap" v-if="!flagSucess">
    <div class="web-content-wrap">
      <div class="web-content">
        <div class="content-text">
          <h3>나만의 청첩장을 만들어봐요.</h3>
          <p>이용을 위해 간단한 가입정보를 신청해주세요.</p>
        </div>
      </div>

      <div class="web-content-two">
        <div class="content-kakao">
          <!--
          <i></i>
          -->
          <p>카카오톡 문의하기</p>
        </div>
        <div class="content-git" @click="sendGit">
          <!--
          <i></i>
          -->
          <p>공지사항</p>
        </div>
      </div>

      <div class="web-content-center">
        <transition name="fade" mode="out-in">
          <!-- 로그인 -->
          <div class="login-btn-wrap" key="login" v-if="isLogin">
            <h3>이메일로 로그인</h3>
            <div class="login-wrap">
              <div class="input-wrap">
                <input type="text" placeholder="이메일을 입력해주세요" />
                <button @click="checkInfo">로그인</button>
              </div>
            </div>
            <div class="login-bottom">
              <p>이용하려면 가입신청이 필요해요!</p>
              <span @click="changeTextLogin">가입신청</span>
            </div>
          </div>

          <!-- 회원가입 -->
          <div class="login-btn-wrap" key="register" v-else>
            <h3>이메일로 가입신청</h3>
            <div class="login-wrap">
              <div class="input-wrap">
                <input type="text" placeholder="이메일을 입력해주세요" />
                <button @click="checkInfo">가입신청</button>
              </div>
            </div>
            <div class="login-bottom">
              <p>계정이 있으신가요?</p>
              <span @click="changeTextLogin">로그인</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
  <section v-else>
    <WebDetailChild
        :sections="sections"
        @update-sections="updateSections"
    ></WebDetailChild>
  </section>
</template>

<script>
import WebDetailChild from "@/components/WebDetailChild.vue";

export default {
  name: "webComponent",
  components: {WebDetailChild},
  data() {
    return {
      isLogin: true,
      flagSucess: false,
    };
  },
  props: {
    sections: {
      type: Array,
      default() {}
    },
  },
  mounted() {},
  methods: {
    // 가입신청으로 화면전환
    changeTextLogin() {
      this.isLogin = !this.isLogin;
    },

    // 회원정보 조회 및 등록화면 호출
    checkInfo() {
      this.flagSucess = !this.flagSucess;
    },
    updateSections(updatedSections) {
      this.$emit("update-sections", updatedSections);
    },
  },
};
</script>

<style scoped lang="scss">
.web-wrap{
  align-self: center;

  .web-content-wrap{
    max-width: 425px;
    width: 100%;

    // 한개짜리 컨텐츠 박스
    .web-content{
      border-radius: 6px;
      padding: 24px 21px;
      background: #ffffff;
      margin-bottom: 24px;
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

      .content-text{
        h3 {
          font-weight: 700;
          font-size: 18px;
          padding-bottom: 6px;
        }

        p{
          font-weight: 500;
          color: #757575;
          font-size: 14px;
        }
      }
    }

    // 두개짜리 컨텐츠 박스
    .web-content-two{
      margin-bottom: 24px;
      display: flex;
      gap: 24px;

      .content-kakao{
        i {
          width: 32px;
          height: 100%;
          background-image: url('../assets/img/icon/kakao_icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          display: inline-block;
        }
        p{
          text-align: center;
          font-weight: 700;
          font-size: 14px;
        }
        width: 50%;
        gap: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        padding: 6px 21px;
        background: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
      }
      .content-git{
        i {
          width: 32px;
          height: 100%;
          background-image: url('../assets/img/icon/kakao_icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          display: inline-block;
        }
        p{
          text-align: center;
          font-weight: 700;
          font-size: 14px;
        }
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        padding: 6px 21px;
        background: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
      }
      :hover{
        cursor: pointer;
      }
    }

    // 실제사용 컨테이너 박스
    .web-content-center{
      border-radius: 6px;
      padding: 24px 21px;
      background: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
      margin-bottom: 16px;

      .login-btn-wrap{
        h3 {
          font-weight: 700;
          font-size: 16px;
        }

        .login-wrap{
          padding-top: 12px;
          .input-wrap{
            display: flex;
            justify-content: space-between;
            max-width: 345px;
            width: 100%;
            padding: 0 0 0 12px;
            border: 0.6px solid #757575;
            transition: border-color 0.3s ease, background-color 0.3s ease;

            input {
              width: 100%;
            }

            button {
              width: 72px;
              padding: 6px;
              font-size: 12px;
              font-weight: 700;
              color: #FFFFFF;
              background-color: #E57373;
            }

            button:hover {
              background: #fa8ea8;
            }
          }

          .input-wrap:hover {
            border: 0.6px solid #FF91A4;
          }

          .input-wrap:focus-within {
            border: 0.6px solid #FF6F61;
            background-color: #FFF4F4;
          }
        }

        .login-bottom{
          display: flex;
          gap: 4px;
          padding-top: 12px;
          p{
            font-weight: 500;
            color: #757575;
            font-size: 12px;
          }
          span {
            font-weight: 500;
            color: #FF91A4;
            font-size: 12px;
          }
          span:hover{
            cursor: pointer;
          }
        }
      }
    }
  }

  // 애니메이션 효과
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

}
</style>