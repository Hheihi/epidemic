<template>
  <div>
    <CustomPageHeader title="我要请假">
      <template slot="extra">
        <a-button type="primary" @click="report()">填写请假申请</a-button>
      </template>
    </CustomPageHeader>
    <a-table :columns="columns" :data-source="data">
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
  </div>
</template>

<script>
import CustomPageHeader from "@/components/CustomPageHeader";
import { LEAVE_COLUMNS ,LEAVE_RULES} from "@/columns/student-columns/leave-columns";
const data = [
  {
    key: "1",
    time: "2021-10-8",
    leaveTime: "2021-10-8——2021-10-10",
    reson: "回家",
    result: 1,
  },
  {
    key: "2",
    time: "2021-10-8",
    leaveTime: "2021-10-8——2021-10-10",
    reson: "回家",
    result: 2,
  },
  {
    key: "3",
    time: "2021-10-8",
    leaveTime: "2021-10-8——2021-10-10",
    reson: "回家",
    result: 3,
  },
];
export default {
  name: "leave",
  components: {
    CustomPageHeader,
  },
  data() {
    return {
      data: data,
      columns: LEAVE_COLUMNS,
      reportVisible: false,
      rules:LEAVE_RULES,
      form: {
        dateStart: '',
        dateEnd: '',
        desc: "",
      },
    };
  },
  methods: {
    report() {
        this.reportVisible = true
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.reportVisible = false
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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