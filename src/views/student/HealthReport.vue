<template>
  <div>
    <CustomPageHeader title="健康上报">
      <template slot="extra">
        <a-button type="primary" @click="report()">填写健康报表</a-button>
      </template>
    </CustomPageHeader>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record">
        <a-tag color="green" @click="detail(record)">查看详情</a-tag>
      </span>
      <template slot="hot" slot-scope="text, row">
        <a-tag color="red" v-if="getStatus(row) === 'hot'">发热</a-tag>
        <a-tag color="green" v-if="getStatus(row) === 'dishot'">未发热</a-tag>
      </template>
    </a-table>
    <!-- 填写报表 -->
    <a-modal
      v-model="reportVisible"
      title="填写报表"
      @ok="submitReport"
      ok-text="确认"
      cancel-text="取消"
      @cancel="hideReport"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item label="当前体温" prop="temperature">
          <a-input v-model="form.temperature" type="number" />
        </a-form-model-item>
        <a-form-model-item label="是否发热、咳嗽" prop="fever">
          <a-radio-group v-model="form.fever">
            <a-radio value="1"> 是 </a-radio>
            <a-radio value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="是否离开过学校" prop="leave">
          <a-radio-group v-model="form.leave">
            <a-radio value="1"> 是 </a-radio>
            <a-radio value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="核酸检测结果" prop="acid">
          <a-radio-group v-model="form.acid">
            <a-radio value="1"> 阳性 </a-radio>
            <a-radio value="2"> 阴性 </a-radio>
            <a-radio value="3"> 无 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="杀毒用品是否充足" prop="products">
          <a-radio-group v-model="form.products">
            <a-radio value="1"> 是 </a-radio>
            <a-radio value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="口罩数量" prop="num">
          <a-input v-model="form.num" type="number" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 查看详情 -->
    <a-modal v-model="visible" title="健康信息" @ok="hideModal">
      <p>创建时间：{{ detailData.name }}</p>
      <p>主题：{{ detailData.class }}</p>
      <p>上报时间：{{ detailData.time }}</p>
      <p>状态：{{ detailData.hot > 1 ? "未发热" : "发热" }}</p>
    </a-modal>
  </div>
</template>

<script>
const data = [
  {
    key: "1",
    name: "John Brown",
    class: "B1802",
    hot: 1,
    time: "2021-11-12",
  },
  {
    key: "2",
    name: "Jim Green",
    class: "B1802",
    hot: 2,
    time: "2021-11-13",
  },
  {
    key: "3",
    name: "Joe Black",
    class: "B1802",
    hot: 2,
    time: "2021-11-14",
  },
];
import CustomPageHeader from "@/components/CustomPageHeader";
import {
  REPORT_COLUMNS,
  REPORT_RULES,
} from "@/columns/student-columns/report-columns";
export default {
  name: "HealthReport",
  components: {
    CustomPageHeader,
  },
  data() {
    return {
      data: data,
      columns: REPORT_COLUMNS,
      detailData: {},
      visible: false,
      reportVisible: false,
      rules: REPORT_RULES,
      form: {
        temperature: undefined,
        fever: undefined,
        leave: undefined,
        acid: undefined,
        products: undefined,
        num: undefined,
      },
    };
  },
  methods: {
    detail(record) {
      this.visible = true;
      this.detailData = record;
    },
    report() {
      this.reportVisible = true;
    },
    hideModal() {
      this.visible = false;
    },
    //隐藏填写报表
    hideReport() {
      this.reportVisible = false;
      this.form = {
        temperature: undefined,
        fever: undefined,
        leave: undefined,
        acid: undefined,
        products: undefined,
        num: undefined,
      };
    },
    getStatus({ hot }) {
      const state = {
        1: "hot",
        2: "dishot",
      };
      return state[hot];
    },
    submitReport() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>