<template>
  <div>
    <CustomPageHeader title="我要请假">
      <template slot="extra">
        <a-button type="primary" @click="report()">填写请假申请</a-button>
      </template>
    </CustomPageHeader>
    <a-table
      :columns="columns"
      :pagination="false"
      :loading="loading"
      :data-source="data"
      rowKey="id"
    >
      <template slot="result" slot-scope="text, row">
        <a-tag color="red" v-if="getStatus(row) === 'refuse'">拒绝</a-tag>
        <a-tag color="green" v-if="getStatus(row) === 'agree'">同意</a-tag>
        <a-tag color="blue" v-if="getStatus(row) === 'review'">审核中</a-tag>
      </template>
    </a-table>

    <!-- 请假申请 -->
    <a-modal
      v-model="reportVisible"
      title="填写报表"
      @ok="submitReport"
      ok-text="确认"
      cancel-text="取消"
      @cancel="hideReport"
    >
      <a-form-model :model="form" ref="ruleForm" :rules="rules">
        <a-form-model-item label="请假开始时间" prop="dateStart">
          <a-date-picker
            v-model="form.dateStart"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </a-form-model-item>
        <a-form-model-item label="请假结束时间" prop="dateEnd">
          <a-date-picker
            v-model="form.dateEnd"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </a-form-model-item>
        <a-form-model-item label="请假理由" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
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
import CustomPageHeader from "@/components/CustomPageHeader";
import {
  LEAVE_COLUMNS,
  LEAVE_RULES,
} from "@/columns/student-columns/leave-columns";
import { LeaveApi } from "@/api";
import CustomPagination from "@/components/CustomPagination";
import moment from "moment";
export default {
  name: "leave",
  components: {
    CustomPageHeader,
    CustomPagination,
  },
  data() {
    return {
      data: [],
      columns: LEAVE_COLUMNS,
      reportVisible: false,
      rules: LEAVE_RULES,
      form: {
        dateStart: "",
        dateEnd: "",
        desc: "",
      },
      page: 1,
      total: 0,
      pageSize: 5,
      loading: false,
    };
  },
  created() {
    this.getLeaveInfo();
  },
  methods: {
    async getLeaveInfo() {
      this.loading = true;
      const { data } = await LeaveApi.getLeaveInfoById({
        sid: JSON.parse(sessionStorage.getItem("id")),
        page: this.page,
        size: this.pageSize,
      });
      if (data.code === 200) {
        this.data = data.data;
        this.total = data.total;
        this.loading = false;
      }
    },
    report() {
      this.reportVisible = true;
    },
    getStatus({ result }) {
      const state = {
        1: "agree",
        2: "refuse",
        3: "review",
      };
      return state[result];
    },
    submitReport() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          const { data } = await LeaveApi.insertLeaveInfo({
            sid: JSON.parse(sessionStorage.getItem("id")),
            create_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            start_time: moment(this.form.dateStart._d).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            end_time: moment(this.form.dateEnd._d).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            reson: this.form.desc,
          });
          if (data.code === 200) {
            this.reportVisible = false;
            this.$message.success(data.msg);
            this.getLeaveInfo()
            this.$refs.ruleForm.resetFields()
          }
        } else {
          return false;
        }
      });
    },
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.getLeaveInfo();
    },
    hideReport() {
      this.reportVisible = false;
      this.form = {
        dateStart: undefined,
        dateEnd: undefined,
        desc: "",
      };
    },
  },
};
</script>

<style>
</style>