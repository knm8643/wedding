<template>
  <section class="web-wrap">
      <div class="web-content">
        <div class="content-text">
          <h3>나만의 청첩장을 만들어봐요.</h3>
          <p>이용을 위해 간단한 가입정보를 신청해주세요.</p>
        </div>
      </div>

      <div class="web-content-center">
        <div class="login-wrap">
          <div class="input-wrap">
            <input type="text" placeholder="이메일을 입력해주세요">
            <button>로그인</button>
          </div>
        </div>
        <div class="login-btn-wrap">
          <p>이용하려면 가입신청이 필요해요!</p>
          <span>가입신청</span>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: "webComponent",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.web-wrap{
 .web-content{
   border-radius: 6px;
   padding: 24px 21px;
   background: #ffffff;
   margin-bottom: 16px;

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

  .web-content-center{
    border-radius: 6px;
    padding: 24px 21px;
    background: #ffffff;
    display: flex;
    gap: 16px;

    .login-wrap{
      .input-wrap{
        width: 100%;
        border: 1px solid #FFB6C1;
        padding: 0 0 0 12px;

        input{
          //color: #757575;
        }

        button {
          padding: 6px;
          border-left: 1px solid #FFB6C1;
        }
      }
    }
  }
}
</style>