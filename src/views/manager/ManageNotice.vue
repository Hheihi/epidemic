<template>
  <div>
    <CustomPageHeader title="通知管理">
      <template slot="extra">
        <a-button type="primary" @click="report()">填写通知</a-button>
      </template>
    </CustomPageHeader>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      rowKey="id"
      :loading="loading"
    >
      <span slot="action" slot-scope="text, record">
        <a-tag color="red" @click="del(record)">删除</a-tag>
      </span>
    </a-table>
    <a-modal
      :visible="visible"
      title="填写通知"
      @ok="submitReport"
      @cancel="hideReport"
    >
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="ruleForm"
        :rules="rules"
      >
        <a-form-model-item label="主题" prop="theme">
          <a-input v-model="form.theme" type="text"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="内容" prop="content">
          <a-input v-model="form.content" type="textarea"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="对象" prop="address">
          <a-cascader
            :options="options"
            :load-data="loadData"
            :change-on-select="true"
            v-model="form.address"
            size="large"
          />
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
  MNOTICE_COLUMNS,
  MNOTICE_RULES,
} from "@/columns/manager-columns/mNotice-columns";
import { NoticeApi, UserInfoApi } from "@/api";
import CustomPagination from "@/components/CustomPagination";
import moment from "moment";
export default {
  name: "ManageNotice",
  data() {
    return {
      columns: MNOTICE_COLUMNS,
      data: [],
      visible: false,
      rules: MNOTICE_RULES,
      form: {
        theme: "",
        content: "",
        address: undefined,
      },
      options: [],
      page: 1,
      total: 0,
      pageSize: 5,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  components: {
    CustomPageHeader,
    CustomPagination,
  },
  created() {
    this.getAllNotice();
    this.getAllGrade();
    // this.getAllCollege();
  },
  methods: {
    async getAllGrade() {
      const { data } = await NoticeApi.selectAllGrade();
      const gradeData = data.data.map((item) => {
        return {
          leavel: 1,
          value: item["id"],
          label: item["grade"],
          isLeaf: false,
        };
      });
      this.options = gradeData;
    },

    async getAllNotice() {
      this.loading = true;
      const { data } = await NoticeApi.selectAllNotice({
        page: this.page,
        size: this.pageSize,
      });
      if (data.code === 200) {
        this.total = data.total;
        this.data = data.data;
        this.loading = false;
      }
    },
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.getAllNotice();
    },

    async del(record) {
      console.log(record);
      const { data } = await NoticeApi.deleteNoticeById({
        id: record.id,
      });
      if (data.code === 200) {
        this.$message.success(data.msg);
        this.getAllNotice();
      }
    },
    report() {
      this.visible = true;
    },
    hideReport() {
      this.visible = false;
      this.$refs.ruleForm.resetFields();
    },
    async loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      const children = await this.getOptions(targetOption);
      targetOption.children = children;
      this.options = [...this.options];
    },
    async getOptions(targetOption) {
      console.log(targetOption);
      let options = [];
      if (targetOption.leavel === 1) {
        const { data } = await UserInfoApi.selectAllCollege();
        options = data.data.map((item) => {
          return {
            leavel: 2,
            value: item["id"],
            label: item["college"],
            isLeaf: false,
          };
        });
      } else if (targetOption.leavel === 2) {
        const { data } = await UserInfoApi.selectMajorByCollegeId({
          collegeId: targetOption.value,
        });
        options = data.data.map((item) => {
          return {
            leave: 3,
            value: item["id"],
            label: item["major"],
            isLeaf: true,
          };
        });
      } else {
        options = [];
      }

      return options;
    },
    submitReport() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          const { data } = await NoticeApi.insertNotice({
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            theme: this.form.theme,
            content: this.form.content,
            gradeId: this.form.address[0],
            collegeId: this.form.address[1],
            majorId: this.form.address[2],
            tId: JSON.parse(sessionStorage.getItem("id")),
          });
          if (data.code === 200) {
            this.visible = false;
            this.$message.success(data.msg);
            this.getAllNotice();
            this.$refs.ruleForm.resetFields();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>