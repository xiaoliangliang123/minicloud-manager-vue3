<template>
  <div class="login-body">

    <div class="login-title">mini-cloud saas框架前端demo</div>

    <div class="login-form">

      <el-form

          status-icon
          :rules="loginRules"
          :model="loginForm"
          ref="loginForm"
          label-width="0">
        <el-form-item prop="username">
          <el-input
              size="small"
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="请输入用户名"
          >
            <i class="icon-yonghu"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              size="small"
              :type="passwordType"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="请输入密码"
          >
            <i
                class="el-icon-view el-input__icon"
                @click="showPassword"
            ></i>
            <i class="icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select default-first-option v-model="tenantOption.value" class="m-2" placeholder="Select" size="large" @change="selectTenantOption">
            <el-option
                v-for="item in tenantOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-button
              style="margin-left: 20px"
              type="primary"
              @click="handleLogin"
              class="login-submit"
          >登录
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "userLogin",
  data() {
    return {

      tenantOption:{
        value: '1',
      },
      tenantOptions :[
        {
          value: '1',
          label: '租戶1',
        },
        {
          value: '2',
          label: '租戶2',
        }
      ],
      loginForm: {
        username: "admin",
        password: "admin",
        code: "",
        randomStr: ""
      },
      checked: false,
      code: {
        src: "/code",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 3, message: "密码长度最少为6位", trigger: "blur"}
        ],
        code: [{required: true, message: "请输入验证码", trigger: "blur"}]
      },
      passwordType: "password"
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  methods: {

    selectTenantOption(){
       console.log(this.tenantOption.value);
    },
    showPassword() {
      this.passwordType == ""
          ? (this.passwordType = "password")
          : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginForm.tenant = this.tenantOption.value;
          this.$store
              .dispatch("LoginByUsername", this.loginForm)
              .then(() => {

                this.$router.push({path: "/main"});
              })
              .catch(() => {
              });
        }
      });
    }
  }
};
</script>

<style>
.login-title {
  font-family: "Arial Black";
  font-size: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
  padding: 50px 130px 40px 40px;
  margin: auto;
  position: absolute;
  top: 30%;
  left: 50%;
  margin: -160px 0 0 -200px;
}

.login-form {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
  padding: 50px 130px 40px 40px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -160px 0 0 -200px;
}

.login-body{
  color: #2d8cf0;
  width: 100%;
  height: 100%;
}
</style>
