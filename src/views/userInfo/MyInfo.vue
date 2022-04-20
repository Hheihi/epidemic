<template>
  <div>
    <!-- 个人信息 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      rowKey="id"
    >
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
    <div>
      <template>
        <ResourceChoice
          media="picture"
          :size="[335, 188.4375]"
          :ratio="ratio"
          v-model="form.image"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { MYINFO_COLUMNS } from "@/columns/userInfo-columns/myInfo-columns";
import { UserInfoApi } from "@/api/index";
import ResourceChoice from "@/components/ResourceChoice.vue";
export default {
  name: "MyInfo",
  data() {
    return {
      data: null,
      columns: MYINFO_COLUMNS,
      form:{
        image:''
      },
      ratio: [16, 9],
    };
  },
  components: {
    ResourceChoice,
  },
  created() {
    const id = sessionStorage.getItem("id");
    UserInfoApi.getUserInfo({ id: id }).then((result) => {
      console.log(result);
      this.data = result.data.data;
    });
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