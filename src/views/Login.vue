<template>
  <div class="login-form">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item label="学号/工号" prop="name">
        <a-input v-model="form.name" type="text"
          ><a-icon slot="prefix" type="user"
        /></a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="pwd">
        <a-input v-model="form.pwd" type="password"
          ><a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)"
        /></a-input>
      </a-form-model-item>
      <a-form-model-item label="身份" prop="type">
        <a-radio-group v-model="form.type">
          <a-radio value="1"> 学生 </a-radio>
          <a-radio value="2"> 老师 </a-radio>
          <a-radio value="3"> 管理员 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit">登录</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { LoginApi } from "@/api/index";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      //   labelCol: { span: 4 },
      //   wrapperCol: { span: 10 },
      form: {
        name: "",
        pwd: "",
        type: "",
      },
      type: undefined,
      rules: {
        name: [
          {
            required: true,
            message: "请输入学号/工号",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择用户类型",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { data } = await LoginApi.login(this.form);
          console.log(data.data);
          if (data.code === 200) {
            localStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.data.sid);
            sessionStorage.setItem("type", data.data.identity);
            this.type = data.data.identity;
            this.$store.dispatch("addUser", data.data);
            this.$router.push("/home/myinfo");
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style scoped>
.login-form {
  width: 25%;
  position: absolute;
  padding: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(206, 206, 206);
}
</style>