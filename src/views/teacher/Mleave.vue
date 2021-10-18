<template>
  <a-table :columns="columns" :data-source="data">
    <span slot="action" slot-scope="text, record">
      <a-button
        type="primary"
        @click="agree(record)"
        :disabled="record.result === 1 || record.result === 2"
        >同意</a-button
      >
      <a-button
        type="danger"
        @click="disAgree(record)"
        :disabled="record.result === 1 || record.result === 2"
        >不同意</a-button
      >
    </span>
    <template slot="result" slot-scope="text, row">
      <a-tag color="red" v-if="getResult(row) === 'dis'">已拒绝</a-tag>
      <a-tag color="blue" v-if="getResult(row) === 'no'">未表决</a-tag>
      <a-tag color="green" v-if="getResult(row) === 'agree'">已同意</a-tag>
    </template>
  </a-table>
</template>

<script>
const data = [
  {
    key: "1",
    leaveName: "John Brown",
    leaveTime: "2021-10-8——2021-10-10",
    reason: "我要请假",
    time: "2021-11-12",
    result: 0,
  },
  {
    key: "2",
    leaveName: "Jim Green",
    leaveTime: "2021-10-8——2021-10-10",

    reason: "我要请假",
    time: "2021-11-13",
    result: 1,
  },
  {
    key: "3",
    leaveName: "Joe Black",
    leaveTime: "2021-10-8——2021-10-10",

    reason: "我要请假",
    time: "2021-11-14",
    result: 2,
  },
];
import { TLEAVE_COLUMNS } from "@/columns/teacher-columns/tleave-columns";
export default {
  name: "Mleave",
  data() {
    return {
      data: data,
      columns: TLEAVE_COLUMNS,
    };
  },
  methods: {
    getResult({ result }) {
      const state = {
        0: "no",
        1: "agree",
        2: "dis",
      };
      return state[result];
    },
    //同意请假申请
    agree(record) {
      console.log(record);
      record.result = 1;
    },
    //不同意请假申请
    disAgree(record) {
      console.log(record);
      record.result = 2;
    },
  },
};
</script>

<style>
</style>