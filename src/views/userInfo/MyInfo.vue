<template>
  <div>
    <!-- 个人信息 -->
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template slot="sex" slot-scope="text, row">
        <a-tag color="blue" v-if="getSex(row) === 'male'">男</a-tag>
        <a-tag color="green" v-if="getSex(row) === 'famale'">女</a-tag>
      </template>
      <template slot="identity" slot-scope="text, row">
        <a-tag color="blue" v-if="getIdentity(row) === 'stu'">学生</a-tag>
        <a-tag color="red" v-if="getIdentity(row) === 'man'">管理员</a-tag>
        <a-tag color="green" v-if="getIdentity(row) === 'tea'">教师</a-tag>
      </template>
    </a-table>
    <!-- 修改头像 -->
    <h1>修改头像 修改密码 未做</h1>
  </div>
</template>

<script>
const data = [
  {
    key: "1",
    name: "John Brown",
    college: "传媒技术学院",
    major: "软件工程",
    sex: 1,
    native: "湖北省武汉市江夏区武汉传媒学院",
    identity: 1,
  },
];
import { MYINFO_COLUMNS } from "@/columns/userInfo-columns/myInfo-columns";
export default {
  name: "MyInfo",
  data() {
    return {
      data: data,
      columns: MYINFO_COLUMNS,
    };
  },
  methods: {
    getSex({ sex }) {
      const state = {
        1: "male",
        2: "famale",
      };
      return state[sex];
    },
    getIdentity({ identity }) {
      const state = {
        1: "stu",
        2: "tea",
        3: "man",
      };
      return state[identity];
    },
  },
};
</script>

<style>
</style>