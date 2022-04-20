<template>
  <div>
    <CustomPageHeader title="健康上报">
      <template slot="extra">
        <a-button type="primary" @click="report()">填写健康报表</a-button>
      </template>
    </CustomPageHeader>
    <a-table
      :columns="columns"
      :pagination="false"
      :loading="loading"
      :data-source="data"
      rowKey="id"
    >
      <span slot="action" slot-scope="text, record">
        <a-tag color="green" @click="detail(record)">查看详情</a-tag>
      </span>
      <template slot="fever" slot-scope="text, row">
        <a-tag color="red" v-if="getFever(row) === 'hot'">发热</a-tag>
        <a-tag color="green" v-if="getFever(row) === 'dishot'">未发热</a-tag>
      </template>
      <template slot="acid" slot-scope="text, row">
        <a-tag color="red" v-if="getAcid(row) === 'yang'">阳性</a-tag>
        <a-tag color="green" v-if="getAcid(row) === 'ying'">阴性</a-tag>
        <a-tag color="gold" v-if="getAcid(row) === 'none'">无</a-tag>
      </template>
      <template slot="health_img" slot-scope="text, record">
        <img
          style="width: 100px; height: 150px"
          :src="record.health_img"
          alt=""
        />
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
        <a-form-model-item label="健康码照片" prop="image">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="() => {}"
            @change="handleChange"
          >
            <img
              style="width: 100px; height: 150px"
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
            />
            <div v-else>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 查看详情 -->
    <a-modal :footer="null" v-model="visible" title="健康信息" @ok="hideModal">
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
import CustomPageHeader from "@/components/CustomPageHeader";
import CustomPagination from "@/components/CustomPagination";
import {
  REPORT_COLUMNS,
  REPORT_RULES,
} from "@/columns/student-columns/report-columns";
import { HealthApi } from "@/api";
import moment from "moment";
import { ResourceApi } from "@/api";

export default {
  name: "HealthReport",
  components: {
    CustomPageHeader,
    CustomPagination,
  },
  data() {
    return {
      data: [],
      columns: REPORT_COLUMNS,
      detailData: {},
      visible: false,
      reportVisible: false,
      rules: REPORT_RULES,
      form: {
        fever: undefined,
        leave: undefined,
        acid: undefined,
        products: undefined,
        num: undefined,
        image: "",
      },
      page: 1,
      total: 0,
      pageSize: 5,
      loading: false,
      ratio: [16, 9],
      imageUrl: "",
    };
  },
  created() {
    this.gelHealthInfo();
  },
  methods: {
    async gelHealthInfo() {
      this.loading = true;
      const { data } = await HealthApi.selectHealthInfoById({
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
      this.$refs["ruleForm"].resetFields();
    },
    getFever({ fever }) {
      const state = {
        1: "hot",
        2: "dishot",
      };
      return state[fever];
    },
    getAcid({ acid }) {
      const state = {
        1: "yang",
        2: "ying",
        3: "none",
      };
      return state[acid];
    },
    submitReport() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          const { data } = await HealthApi.insertHealthInfo({
            sid: JSON.parse(sessionStorage.getItem("id")),
            fever: this.form.fever,
            leaveSchool: this.form.leave,
            acid: this.form.acid,
            virus: this.form.products,
            mask: this.form.num,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            healthImg: this.imageUrl,
          });
          if (data.code === 200) {
            this.$message.success(data.msg);
            this.gelHealthInfo();
            this.$refs["ruleForm"].resetFields();
            this.reportVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.gelHealthInfo();
    },

    async handleChange(info) {
      // if (info.file.status === "uploading") {
      // return;
      // }
      // if (info.file.status === "done") {
      // Get this url from response in real world.
      // this.getBase64(info.file.originFileObj, (imageUrl) => {
      //   this.imageUrl = imageUrl;
      //   this.loading = false;
      // });
      let formData = new FormData();
      console.log(info);
      formData.append("file", info.file.originFileObj);
      // formData.set('file', file)
      const { data } = await ResourceApi.uploadFile(formData);
      this.imageUrl = data.data.imgUrl;
      // if (data.code === 200) {
      //   const saveData = await ResourceApi.saveUploadFile({
      //     imgUrl: data.data.imgUrl,
      //     media: data.data.media,
      //     fileName: data.data.fileName,
      //     originName: data.data.originName,
      //     size: data.data.size,
      //     sid: sessionStorage.getItem("id"),
      //   });
      //   if (saveData.data.code == 200) {
      //     this.$message.success("文件上传成功");
      //   }
      // }
      // }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>

<style>
</style>