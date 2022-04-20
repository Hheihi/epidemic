<template>
  <a-layout>
    <a-layout id="components-layout-demo-top-side">
      <a-layout-header class="header">
        <div class="logo">
          <p class="title">校园疫情管理系统</p>
        </div>
        <div class="avater">
          <a-dropdown placement="bottomCenter">
            <a-avatar size="large" :src="getAvater" icon="user" />
            <a-menu slot="overlay" @click="meauClick">
              <a-menu-item>
                <span
                  ><a-tag color="green" class="identity">{{
                    identity
                  }}</a-tag></span
                >
              </a-menu-item>
              <a-menu-item
                key="/home/myinfo"
                v-if="type === '1' || type === '2'"
              >
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item>
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
    </a-layout>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            theme="light"
            :default-selected-keys="['/home/myinfo']"
            style="height: 100%"
            @click="meauClick"
          >
            <a-menu-item key="/home/Home">
              <a-icon type="message" />
              <span class="nav-text">首页</span>
            </a-menu-item>
            <a-menu-item key="/home/notice" v-if="type === '1'">
              <a-icon type="message" />
              <span class="nav-text">我的通知</span>
            </a-menu-item>
            <a-menu-item key="/home/report" v-if="type === '1'">
              <a-icon type="to-top" />
              <span class="nav-text">健康上报</span>
            </a-menu-item>
            <a-menu-item key="/home/leave" v-if="type === '1'">
              <a-icon type="edit" />
              <span class="nav-text">我要请假</span>
            </a-menu-item>
            <a-menu-item key="/home/myinfo">
              <a-icon type="user" />
              <span class="nav-text">个人中心</span>
            </a-menu-item>
            <a-menu-item key="/home/mStu" v-if="type === '3'">
              <a-icon type="usergroup-add" />
              <span class="nav-text">学生管理</span>
            </a-menu-item>
            <a-menu-item key="/home/mTea" v-if="type === '3'">
              <a-icon type="user-add" />
              <span class="nav-text">教师管理</span>
            </a-menu-item>
            <a-menu-item
              key="/home/mNotice"
              v-if="type === '2' || type === '3'"
            >
              <a-icon type="deployment-unit" />
              <span class="nav-text">通知管理</span>
            </a-menu-item>
            <a-menu-item key="/home/mLeave" v-if="type === '2'">
              <a-icon type="setting" />
              <span class="nav-text">请假管理</span>
            </a-menu-item>
            <a-menu-item key="/home/mHealth" v-if="type === '2'">
              <a-icon type="setting" />
              <span class="nav-text">健康管理</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '800px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      校园疫情管理系统 ©2021 Created by coderLy
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { UserInfoApi } from "@/api";

export default {
  data() {
    return {
      userInfo: [],
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    type() {
      return sessionStorage.getItem("type");
    },
    identity() {
      const type = sessionStorage.getItem("type");
      const id = {
        1: "学生",
        2: "教师",
        3: "管理员",
      };
      return id[type];
    },
    getAvater() {
      return this.userInfo[0]?.avater;
    },
  },
  methods: {
    meauClick({ key }) {
      this.$router.push(key);
    },
    async getUserInfo() {
      const { data } = await UserInfoApi.getUserInfo({
        id: JSON.parse(sessionStorage.getItem("id")),
      });
      if (data.code === 200) {
        this.userInfo = data.data;
      }
    },
  },
};
</script>
<style>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.logo {
  text-align: center;
  line-height: 30px;
}
.avater {
  float: right;
}
.identity {
  text-align: center;
}
.title {
  color: white;
  width: 120px;
  height: 30px;
}
.trigger {
  color: white;
}
.link {
  width: 70px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
</style>