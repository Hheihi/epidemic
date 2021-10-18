<template>
  <div class="page-not-find">
    <div class="error-box">
      <img :src="pageNotFindIcon" height="400" alt="找不到页面" />
      <div class="error-box-text">
        <div class="error-box-code primary-title">404</div>
        <div class="error-box-tips minor-title">oops! 页面找不到了！</div>
        <div class="error-box-btns">
          <a-button type="link mt5" @click="$router.replace('/home')">
            返回首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageNotFindIcon from "@/assets/image/page-not-find.png";
export default {
  name: "error",
  data() {
    return {
      pageNotFindIcon,
    };
  },
};
</script>

<style  scoped>
.page-not-find {
  height: 100%;
}

.error-box {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.error-box-text {
  display: inline-block;
  vertical-align: middle;
}

.error-box-code {
  font-size: 100px;
}

.error-box-tips {
  font-size: 25px;
}
</style>
