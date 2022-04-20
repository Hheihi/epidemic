<template>
  <div>
    <CustomPageHeader title="请假管理">
      <template slot="extra">
        <a-input-search
          placeholder="根据学生姓名搜索"
          style="width: 200px"
          @search="onSearch"
        />
        <a-select
          style="width: 200px"
          placeholder="根据审核结果进行筛选"
          @change="resChange"
        >
          <a-select-option key="1" :value="2"> 拒绝 </a-select-option>
          <a-select-option key="2" :value="1"> 同意 </a-select-option>
          <a-select-option key="2" :value="3"> 审核中 </a-select-option>
        </a-select>
      </template>
    </CustomPageHeader>
    <a-table
      :columns="columns"
      :pagination="false"
      rowKey="id"
      :loading="loading"
      :data-source="data"
    >
      <span slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          @click="agree(record)"
          :disabled="record.result === 1 || record.result === 2"
          size="small"
          style="margin-right: 10px"
          >同意</a-button
        >
        <a-button
          type="danger"
          @click="disAgree(record)"
          :disabled="record.result === 1 || record.result === 2"
          size="small"
          >不同意</a-button
        >
      </span>
      <template slot="result" slot-scope="text, row">
        <a-tag color="red" v-if="getResult(row) === 'dis'">已拒绝</a-tag>
        <a-tag color="blue" v-if="getResult(row) === 'no'">审核中</a-tag>
        <a-tag color="green" v-if="getResult(row) === 'agree'">已同意</a-tag>
      </template>
    </a-table>
    <CustomPagination
      @change="changePage"
      :page="page"
      :total="total"
      :pageSize="pageSize"
    />
  </div>
</template>

<script>
import { TLEAVE_COLUMNS } from "@/columns/teacher-columns/tleave-columns";
import { LeaveApi } from "@/api";
import CustomPageHeader from "@/components/CustomPageHeader";

import CustomPagination from "@/components/CustomPagination";

export default {
  name: "Mleave",
  data() {
    return {
      data: [],
      columns: TLEAVE_COLUMNS,
      page: 1,
      total: 0,
      pageSize: 5,
      loading: false,
      username: "",
      result: "",
    };
  },
  components: {
    CustomPagination,
    CustomPageHeader,
  },
  created() {
    this.getAllLeaveInfo();
  },
  methods: {
    async getAllLeaveInfo() {
      this.loading = true;
      const { data } = await LeaveApi.teaGetAllLeaveInfo({
        sid: JSON.parse(sessionStorage.getItem("id")),
        page: this.page,
        size: this.pageSize,
        username: this.username,
        result: this.result,
      });
      if (data.code === 200) {
        this.data = data.data;
        this.total = data.total;
        this.loading = false;
      }
    },
    getResult({ result }) {
      const state = {
        3: "no",
        1: "agree",
        2: "dis",
      };
      return state[result];
    },
    //同意请假申请
    async agree(record) {
      const { data } = await LeaveApi.agereeLeave({
        id: record.id,
      });
      if (data.code === 200) {
        this.$message.success(data.msg);
        this.getAllLeaveInfo();
      }
    },
    //不同意请假申请
    async disAgree(record) {
      const { data } = await LeaveApi.disAgreeLeave({
        id: record.id,
      });
      if (data.code === 200) {
        this.$message.success(data.msg);
        this.getAllLeaveInfo();
      }
    },
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.getAllLeaveInfo();
    },
    resChange(value) {
      this.result = value;
      this.page = 1;
      this.pageSize = 5;
      this.getAllLeaveInfo();
    },
    onSearch(value) {
      this.username = value;
      this.page = 1;
      this.pageSize = 5;
      this.getAllLeaveInfo();
    },
  },
};
</script>

<style>
</style>