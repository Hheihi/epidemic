<template>
  <!-- 带返回按钮 -->
  <PageHeader
    v-if="backRouter"
    class="baldy-page-heider mb10"
    :title="title"
    :sub-title="subTitle"
    @back="$router.push(backRouter)"
  >
    <template slot="extra">
      <slot name="extra" />
    </template>
  </PageHeader>
  <!-- 不带返回按钮 -->
  <PageHeader
    v-else
    class="baldy-page-heider mb10"
    :title="title"
    :sub-title="subTitle"
  >
    <template slot="extra">
      <slot name="extra" />
    </template>
  </PageHeader>
</template>

<script>
import { PageHeader } from "ant-design-vue";
export default {
  name: "CustomPageHeader",
  components: {
    PageHeader,
  },
  props: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    backRouter: {
      type: String,
    },
  },
};
</script>

<style  scoped>
.baldy-page-heider{
    border: 1px solid rgb(235, 237, 240);
    background-color: #fff
}
  
</style>
