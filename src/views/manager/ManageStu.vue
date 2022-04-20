<template>
  <div>
    <CustomPageHeader title="学生管理">
      <template slot="extra">
        <a-upload
          :showUploadList="false"
          :beforeUpload="beforeFileUpload"
          @change="fileUpload"
          :customRequest="() => {}"
        >
          <a-button> <a-icon type="upload" /> 上传学生信息 </a-button>
        </a-upload>
      </template>
    </CustomPageHeader>
    <a-table
      :data-source="data"
      :columns="columns"
      :pagination="false"
      rowKey="sid"
    >
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" @click="getDetail(record)">查看详情</a-button>
        <a-button type="primary" @click="changeInfo(record)">修改</a-button>
        <a-button type="primary" @click="deleteUser(record)">删除</a-button>
      </span>

      <template slot="sex" slot-scope="sex">
        <a-tag color="blue" v-if="getSex(sex) === 'male'">男</a-tag>
        <a-tag color="green" v-if="getSex(sex) === 'female'">女</a-tag>
      </template>
    </a-table>
    <a-modal
      :visible="visible"
      footer="null"
      @cancel="handleCancel"
      title="查看详情"
    >
      <p v-for="(item, index) in columns" :key="index">
        {{ item.title }}:
        {{
          item.key === "sex" ? getSexText(record[item.key]) : record[item.key]
        }}
      </p>
    </a-modal>
    <a-modal
      :visible="visibleChange"
      @cancel="handleCancel"
      @ok="changeInfoOk"
      title="修改信息"
      :confirmLoading="confirmLoading"
    >
      <a-form-model ref="ruleForm" :model="record" v-bind="layout">
        <a-form-model-item label="姓名" prop="name">
          <a-input v-model="record.name" type="text" />
        </a-form-model-item>
        <a-form-model-item label="性别" prop="sex">
          <a-select v-model="record.sex">
            <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="2">女</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="年龄" prop="age">
          <a-input-number :min="1" :max="100" v-model="record.age" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="pwd">
          <a-input-password v-model="record.pwd" />
        </a-form-model-item>
        <a-form-model-item label="学院" prop="college">
          <!-- 查询 所有的学院信息 -->
          <a-select
            v-model="record.collegeId"
            style="width: 150px"
            @change="collegeChange"
          >
            <a-select-option
              v-for="(college, index) in collegeData"
              :value="college.id"
              :key="index"
            >
              {{ college.college }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="专业" prop="major">
          <!-- 查询 所有的学院信息 -->
          <a-select v-model="record.majorId" style="width: 150px">
            <a-select-option
              v-for="(major, index) in majorData"
              :value="major.id"
              :key="index"
            >
              {{ major.major }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="联系方式" prop="phone">
          <a-input v-model="record.phone" />
        </a-form-model-item>
        <a-form-model-item label="籍贯" prop="source">
          <a-input v-model="record.source" />
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
import { MSTUDENT_COLUMNS } from "@/columns/manager-columns/mStudent-columns";
import CustomPageHeader from "@/components/CustomPageHeader";
import CustomPagination from "@/components/CustomPagination";
import { UserInfoApi, ResourceApi } from "@/api";
import { cloneDeep } from "lodash";
import { message } from "ant-design-vue";
export default {
  name: "ManageStu",
  data() {
    return {
      data: [],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      columns: MSTUDENT_COLUMNS,
      record: {}, //查看详情
      visible: false,
      visibleChange: false,
      page: 1,
      total: 0,
      pageSize: 5,
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      collegeData: [],
      majorData: [],
      confirmLoading: false,
    };
  },
  created() {
    this.getStudentsInfo();
    this.selectAllCollege();
  },
  components: {
    CustomPageHeader,
    CustomPagination,
  },
  computed: {},
  methods: {
    beforeFileUpload(file) {
      // console.log(file);
      if (
        file.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        message.error("请选择xlsx后缀文件");
      }
      return;
    },
    async fileUpload({ file }) {
      console.log(file);
      // console.log(fileList);
      // if (file.status === "uploading") {
      //   return;
      // }
      // if (file.status === "done") {
      let formData = new FormData();
      formData.append("file", file.originFileObj);
      // console.log(formData);
      const { data } = await ResourceApi.stuExcelUpload(formData);
      console.log(data);
      formData = null;
      // console.log(data);
      if (data.code === 200) {
        message.success("上传成功");
        this.getStudentsInfo();
      }
      // }
    },
    async selectAllCollege() {
      const { data } = await UserInfoApi.selectAllCollege();
      this.collegeData = data.data;
      console.log(this.collegeData);
    },
    getSex(sex) {
      const male = {
        1: "male",
        2: "female",
      };
      return male[sex];
    },
    getSexText(sex) {
      return this.getSex(sex) === "male" ? "男" : " 女";
    },
    report() {
      console.log("上传");
    },
    async getStudentsInfo() {
      const { data } = await UserInfoApi.getStudentsInfo({
        page: this.page,
        size: this.pageSize,
      });
      if (data.code === 200) {
        this.total = data.total;
        this.data = data.data;
      }
    },
    getDetail(record) {
      this.visible = true;
      this.record = record;
    },
    handleCancel() {
      this.visible = false;
      this.visibleChange = false;
    },
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.getStudentsInfo();
    },
    // 修改学生信息
    async changeInfo(record) {
      this.visibleChange = true;
      this.record = cloneDeep(record);
      const { data } = await UserInfoApi.selectMajorByCollegeId({
        collegeId: record.collegeId,
      });
      this.majorData = data.data;
    },
    // 修改学生信息 学院改变时  专业对应改变
    async collegeChange(value) {
      const { data } = await UserInfoApi.selectMajorByCollegeId({
        collegeId: value,
      });
      this.majorData = data.data;
    },
    // 修改信息 提交
    async changeInfoOk() {
      this.confirmLoading = true;
      console.log(this.record);
      const { data } = await UserInfoApi.updateUserInfoBySid({
        sid: this.record.sid,
        name: this.record.name,
        sex: this.record.sex,
        age: this.record.age,
        pwd: this.record.pwd,
        grede_id: this.record.gradeId,
        college_id: this.record.collegeId,
        major_id: this.record.majorId,
        source: this.record.source,
        phone: this.record.phone,
      });
      if (data.code === 200) {
        this.confirmLoading = false;
        this.$message.success(data.msg);
        this.visibleChange = false;
        this.getStudentsInfo();
      }
    },
    // 删除学生
    async deleteUser(record) {
      console.log(record);
      const { data } = await UserInfoApi.deleteUserBySid({
        sid: record.sid,
      });
      if (data.code === 200) {
        this.getStudentsInfo();
        this.$message.success(data.msg);
      }
    },
  },
};
</script>

<style>
</style>