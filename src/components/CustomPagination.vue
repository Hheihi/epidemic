<template>
  <a-pagination
    :size="size"
    class="custom-pagination"
    :current="page"
    :page-size="pageSize"
    :hide-on-single-page="false"
    :show-size-changer="switchPageSize"
    :page-size-options="pageSizes"
    :total="total"
    :show-total="(total) => `共 ${total} 条数据`"
    @change="changePage"
    @showSizeChange="showSizeChange"
  >
    <template slot="buildOptionText" slot-scope="props">
      <span>{{ props.value }} 条/页</span>
    </template>
  </a-pagination>
</template>

<script>
export default {
  name: "CustomPagination",
  props: {
    // 当前页
    page: {
      type: Number,
      default: 1,
    },
    // 总条数
    total: {
      type: Number,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    switchPageSize: {
      type: Boolean,
      default: true,
    },
    // 可选的每页条数
    pageSizeOptions: {
      type: Array,
      default: () => ["5","10", "20", "30"],
    },
    size: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 分页数组的值处理成数组整型字符串
    pageSizes() {
      return this.pageSizeOptions.map((item) => String(parseInt(item)));
    },
  },
  methods: {
    // 页码和每页条数
    changePage(page, size) {
      this.$emit("change", page, size);
    },
    // 当前页，每页条数
    showSizeChange(page, size) {
      this.$emit("change", page, size);
    },
  },
};
</script>
<style  scoped>
.custom-pagination{
  margin-top: 15px;
  float: right
}
  
</style>
