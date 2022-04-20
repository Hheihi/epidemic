<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="id"
       :pagination="false"
      :loading="loading"
      @change="onChange"
    >
      <span slot="action" slot-scope="text, record">
        <a-tag color="green" @click="detail(record)">查看详情</a-tag>
      </span>
    </a-table>
    <a-modal v-model="visible" title="我的通知" @ok="hideModal">
      <p v-for="(item, index) in columns" :key="index">
        {{ item.title }}:{{ detailData[item.key] }}
      </p>
    </a-modal>
    <CustomPagination
      @change="changePage"
      :page="page"
      :total="total"
      :pageSize="pageSize"
    />
  </div>
</template>
<script>
import { NOTICE_COLUMNS } from "@/columns/student-columns/notice-columns";
import { NoticeApi } from "@/api";
import CustomPagination from "@/components/CustomPagination";

export default {
  name: "Notice",
  data() {
    return {
      data: [],
      columns: NOTICE_COLUMNS,
      visible: false,
      detailData: {},
      page: 1,
      total: 0,
      pageSize: 5,
      loading: false,
    };
  },
  components: {
    CustomPagination,
  },
  computed: {},
  created() {
    this.getNoticeById();
  },
  methods: {
    async getNoticeById() {
      this.loading = true;
      const { data } = await NoticeApi.selectNoticeById({
        sid: JSON.parse(sessionStorage.getItem("id")),
        page: this.page,
        size: this.pageSize,
      });
      console.log(data);
      if (data.code === 200) {
        this.total = data.total
        console.log(this.total);
        this.data = data.data;
        this.loading = false;
      }
    },
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
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.getNoticeById();
    },
  },
};
</script>