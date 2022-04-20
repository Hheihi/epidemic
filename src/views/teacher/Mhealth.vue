<template>
  <div>
    <CustomPageHeader title="健康管理">
      <template slot="extra">
        <a-input-search
          placeholder="根据学生姓名搜索"
          style="width: 200px"
          @search="onSearch"
        />
        <a-select
          style="width: 200px"
          placeholder="根据发热进行筛选"
          @change="feverChange"
        >
          <a-select-option key="1" :value="2"> 不发热 </a-select-option>
          <a-select-option key="2" :value="1"> 发热 </a-select-option>
        </a-select>
        <a-select
          style="width: 200px"
          placeholder="根据核酸结果进行筛选"
          @change="acidChange"
        >
          <a-select-option key="1" :value="2"> 阴性 </a-select-option>
          <a-select-option key="2" :value="1"> 阳性 </a-select-option>
          <a-select-option key="3" :value="3"> 未检测 </a-select-option>
        </a-select>
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
        <a-tag color="gold" v-if="getAcid(row) === 'none'">未检测</a-tag>
      </template>
      <template slot="health_img" slot-scope="text, record">
        <img
          style="width: 100px; height: 150px"
          :src="record.health_img"
          alt=""
        />
      </template>
    </a-table>
    <a-modal :footer="null" v-model="visible" title="健康信息" @ok="hideModal">
      <p v-for="(item, index) in columns" :key="index">
        {{ item.title }}:{{ detailData[item.key] }}
      </p>
      <img width="400px" height="600px" :src="detailData.health_img" alt="" />
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
import { REPORT_COLUMNS } from "@/columns/student-columns/report-columns";
import { HealthApi } from "@/api";

export default {
  name: "Mhealth",
  data() {
    return {
      data: [],
      columns: REPORT_COLUMNS,
      detailData: {},
      page: 1,
      total: 0,
      pageSize: 5,
      loading: false,
      fever: 0,
      username: "",
      visible: false,
      acid: 0,
    };
  },
  components: {
    CustomPageHeader,
    CustomPagination,
  },
  created() {
    this.getAllHealthInfo();
  },
  methods: {
    async getAllHealthInfo() {
      this.loading = true;
      const { data } = await HealthApi.teaSelectHealthInfo({
        sid: JSON.parse(sessionStorage.getItem("id")),
        page: this.page,
        size: this.pageSize,
        fever: this.fever,
        username: this.username,
        acid: this.acid,
      });
      if (data.code === 200) {
        this.data = data.data;
        this.total = data.total;
        this.loading = false;
      }
      this.loading = false;
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
    changePage(page, size) {
      this.page = page;
      this.pageSize = size;
      this.getAllHealthInfo();
    },
    feverChange(value) {
      this.fever = value;
      this.page = 1;
      this.pageSize = 5;
      this.getAllHealthInfo();
    },
    onSearch(value) {
      this.username = value;
      this.page = 1;
      this.pageSize = 5;
      this.getAllHealthInfo();
    },
    detail(record) {
      this.visible = true;
      this.detailData = record;
    },
    hideModal() {
      this.visible = false;
    },
    acidChange(value) {
      this.acid = value;
      this.page = 1;
      this.pageSize = 5;
      this.getAllHealthInfo();
    },
  },
};
</script>

<style>
</style>