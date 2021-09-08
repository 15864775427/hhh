<template>
  <div class="login-page">
    <div class="login-form">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="account">
          <el-input
            v-model="form.account"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <div class="verificationBox">
          <el-form-item prop="verificationCode">
            <el-input
              v-model="form.verificationCode"
              @keyup.enter.native="onSubmit"
            ></el-input>
          </el-form-item>
          <img
            class="verificationImage"
            :src="
              'http://172.22.8.95:9800/api/auth/home/user/genVerifycode?' +
                timestamp
            "
            @click="resetImg"
          />
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="loginBtn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import check from "./check";
import { httpGet, httpPost } from "@/http";
import router from "@/router";
export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "",
        password: "",
        verificationCode: ""
      },
      timestamp: "",
      rules: check
    };
  },
  methods: {
    /**
     * 登陆
     */
    onSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          httpPost("/auth/home/user/validateVerifycode", {
            verifyCode: this.form.verificationCode
          }).then(res => {
            if (res.message == "成功") {
              let dataParams = {
                grantType: "password",
                userType: "01",
                password: this.form.password, // 密码
                username: this.form.account, // 用户名
                verifycode: this.form.verificationCode // 验证码
              };
              httpPost("/auth/home/user/login", dataParams)
                .then(res => {
                  if (res.code === "1000000000") {
                    let data = res.result;
                    sessionStorage.setItem("token", data.jwt_token); //存token
                    sessionStorage.setItem("refresh_token", data.refresh_token); //存token
                    const loading = this.$loading({
                      lock: true,
                      text: "Loading",
                      spinner: "el-icon-loading",
                      background: "#FFF"
                    });
                    setTimeout(_ => {
                      httpGet("/ucenter/menu/queryUserMenusTrees")
                        .then(r => {
                          if (r.code === "1000000000") {
                            let arr = r.result;
                            loading.close();
                            sessionStorage.setItem(
                              "menulist",
                              JSON.stringify(arr)
                            );
                            let menu = [];
                            for (let i = 0; i < arr.length; i++) {
                              menu.push(...arr[i].childs);
                            }
                            localStorage.setItem("menu", JSON.stringify(menu));
                            router.push({
                              path: arr[0].childs[0].url
                            });
                          }
                        })
                        .catch(err => {
                          this.$message.error(err);
                        });
                    }, 1000);
                  } else {
                    resetImg(); //图片验证码
                    this.form.verificationCode = "";
                    this.$message.error(res.message);
                  }
                })
                .catch(err => {
                  this.$message.error("登录失败，请重试");
                });
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 刷新验证码
     */
    resetImg() {
      this.timestamp = new Date().getTime();
    }
  }
};
</script>
<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
  position: relative;
}
.login-form {
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  position: absolute;
  right: 200px;
  bottom: 300px;
  .verificationBox {
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 22px;
    .el-form-item {
      margin: 0;
    }
    .verificationImage {
      height: 30px;
      width: auto;
      margin-left: 20px;
    }
  }
  .loginBtn {
    width: 100%;
  }
}
</style>
