<template>
  <div>
    <a-table :columns="columns" :data-source="data" @change="onChange">
      <template slot="status" slot-scope="text, row">
        <a-tag color="green" v-if="getStatus(row) === 'pass'">已读</a-tag>
        <a-tag color="red" v-if="getStatus(row) === 'refuse'">未读</a-tag>
      </template>
      <span slot="action" slot-scope="text, record">
        <a-tag color="blue" v-if="record.status === 2" @click="accept(record)"
          >已读</a-tag
        >
        <a-tag color="red" v-if="record.status === 1" @click="reject(record)"
          >未读</a-tag
        >
        <a-tag color="green" @click="detail(record)">查看详情</a-tag>
      </span>
    </a-table>
    <a-modal v-model="visible" title="我的通知" @ok="hideModal">
      <p>创建时间：{{ detailData.time }}</p>
      <p>主题：{{ detailData.theme }}</p>
      <p>内容{{ detailData.content }}</p>
      <p>状态：{{ detailData.status > 1 ? "未读" : "已读" }}</p>
    </a-modal>
  </div>
</template>
<script>
const data = [
  {
    key: "1",
    time: "2021-1-10",
    theme: "123231",
    content: "今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家",
    status: 1,
  },
  {
    key: "2",
    time: "2021-1-10",
    theme: "123231",
    content: "今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家",
    status: 1,
  },
  {
    key: "3",
    time: "2021-1-10",
    theme: "123231",
    content: "今天放假噶就开始公开警告日哦我FGVHLSGFJKLSDGH监考老师给大家",
    status: 1,
  },
];
import { NOTICE_COLUMNS } from "@/columns/student-columns/notice-columns";
export default {
  name: "Notice",
  data() {
    return {
      data,
      columns: NOTICE_COLUMNS,
      visible: false,
      detailData: {},
    };
  },
  methods: {
    onChange(pagination, filters, sorter) {
      console.log("params", pagination, filters, sorter);
    },
    getStatus({ status }) {
      const state = {
        1: "pass",
        2: "refuse",
      };
      return state[status];
    },
    accept(record) {
      console.log(record);

      this.data.forEach((item) => {
        if (item.key == record.key) {
          item.status = 1;
        }
      });
    },
    reject(record) {
      console.log(record);
      this.data.forEach((item) => {
        if (item.key == record.key) {
          item.status = 2;
        }
      });
    },
    detail(record) {
      this.visible = true;
      this.detailData = record;
    },
    hideModal() {
      this.visible = false;
    },
  },
};
</script>