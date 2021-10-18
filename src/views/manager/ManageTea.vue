<template>
  <div>
    <CustomPageHeader title="教师管理">
      <template slot="extra">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          <a-button> <a-icon type="upload" /> 上传教师信息 </a-button>
        </a-upload>
      </template>
    </CustomPageHeader>
    <a-table :data-source="data" :columns="columns">
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`搜索 ${column.title}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
    </a-table>
  </div>
</template>

<script>
const data = [
  {
    key: "1",
    name: "John Brown",
    tid: "18495990233",
    age: 32,
    sex: "男",
    grade: "18级",
    college: "传媒技术学院",
    major: "软件工程",
    phone: "17671867021",
  },
  {
    key: "2",
    name: "John Brown",
    tid: "18495990234",
    age: 32,
    sex: "男",
    grade: "18级",
    college: "传媒技术学院",
    major: "软件工程",
    phone: "17671867021",
  },
  {
    key: "3",
    name: "John Brown",
    tid: "18495990235",
    age: 32,
    sex: "男",
    grade: "18级",
    college: "传媒技术学院",
    major: "软件工程",
    phone: "17671867021",
  },
  {
    key: "4",
    name: "John Brown",
    tid: "18495990233",
    age: 32,
    sex: "男",
    grade: "18级",
    college: "传媒技术学院",
    major: "软件工程",
    phone: "17671867021",
  },
];
import { MTEACHER_COLUMNS } from "@/columns/manager-columns/mTeacher-columns";
import CustomPageHeader from "@/components/CustomPageHeader";

export default {
  name: "ManageStu",
  data() {
    return {
      data: data,
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      columns: MTEACHER_COLUMNS,
    };
  },
  components: {
    CustomPageHeader,
  },
  methods: {
    report() {
      console.log("上传");
    },
    
  },
};
</script>

<style>
</style>