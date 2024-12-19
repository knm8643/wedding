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
        <div class="content-git">
          <img src="../assets/img/icon/github_icon.png" alt="github">
          <div class="git-info">
            <p @click="sendUrlGit('made')">개발자 알아보기</p>
            <span @click="sendUrlGit('help')">도움준 사람</span>
          </div>
        </div>
        <div class="content-other">
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
                <input type="text" v-model="userEmail" maxlength="50" placeholder="이메일을 입력해주세요" />
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
                <input type="text" v-model="userEmail" maxlength="50" placeholder="이메일을 입력해주세요" />
                <button @click="sendInfo">가입신청</button>
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
import emailjs from "emailjs-com";

export default {
  name: "webComponent",
  components: {WebDetailChild},
  data() {
    return {
      userInfos: [],
      userEmail: '',
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
  mounted() {
    this.userInfos = [
      {name: 'knm8643@nate.com'},
      {name: 'knm8643@gmail.com'},
      {name: 'nocoolboy@naver.com'},
    ]
  },
  methods: {
    vailCheck(){
      if(this.userEmail === '') {
        alert('이메일을 입력해주세요.');
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.userEmail)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return false;
      }
      return true;
    },

    // 단순페이지 전송
    sendUrlGit(param) {
      // 깃허브 gh특성상 새창으로
      if (param === 'made') {
        window.open('https://github.com/knm8643', '_blank');
      } else {
        window.open('https://github.com/yu-rim95', '_blank');
      }
    },

    // 가입신청으로 화면전환
    changeTextLogin() {
      this.isLogin = !this.isLogin;
    },

    checkInfo() {
      if (this.vailCheck()) {
        const emailExists = this.userInfos.some(userInfo => userInfo.name === this.userEmail);
        if (emailExists) {
          this.flagSucess = !this.flagSucess;
        } else {
          alert("신청되지 않은 이메일입니다.");
        }
      }
    },

    sendInfo() {
      if(this.vailCheck()) {
        const emailExists = this.userInfos.some(userInfo => userInfo.name === this.userEmail);
        if (!emailExists) {
          emailjs.init("HsS2kuozk9ToWT7O7");
          emailjs
              .send("service_portfolio", "template_1mkalef", {
                to_name: 'chungrimi.com',
                from_name: 'chungrimi.com',
                message: this.userEmail,
              })
              .then(() => {
                alert("회원가입 신청이 성공했습니다. \n(승인까지 약 1일 내외 소요)");
              })
              .catch(() => {
                alert("API 통신에러");
              });
        } else {
          alert("이미 가입신청된 상태입니다.")
        }
      }
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

      .content-git{
        img{
          border-radius: 50%;
          width: 42px;
          height: 42px;
        }

        .git-info{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          p{
            font-weight: 700;
            font-size: 14px;
          }
          span{
            padding-top: 4px;
            font-weight: 500;
            color: #757575;
            font-size: 14px;
          }

          p:hover {
            color: #fa8ea8;
          }

          span:hover{
            font-weight: 700;
          }
        }

        width: 50%;
        gap: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        padding: 24px 21px;
        background: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
      }
      .content-other{
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
            border: 0.6px solid #b7b7b7;
            transition: border-color 0.3s ease, background-color 0.3s ease;

            input {
              font-size: 14px;
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