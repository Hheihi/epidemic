<template>
  <a-modal
    title="裁剪图片"
    width="1000px"
    ok-text="裁剪并上传"
    :body-style="{ display: 'flex' }"
    :visible="visible"
    :destroy-on-close="true"
    :centered="true"
    :mask-closable="false"
    :confirm-loading="loading"
    @ok.stop="cropper"
    @cancel="$emit('close')"
  >
    <div class="cropper-box" v-if="img">
      <VueCropper
        ref="cropper"
        :viewMode="1"
        :containerStyle="{ height: '400px', width: '100%' }"
        :aspect-ratio="aspectRatio"
        :src="img"
      />
    </div>
    <div class="cropper-info ml25">
      <div class="infox-box">
        <strong><a-icon class="mr10" type="info-circle" />提示：</strong>
        <br />
        <div>限制比例为： {{ ratioText }}</div>
        <div>双击画布可切换图片移动模式和裁剪模式</div>
      </div>
      <a-button class="rotate mt25" type="primary" @click.stop="rotate">
        旋转
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "PictureCropper",
  components: {
    VueCropper,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 需要被裁剪的图片
    img: {
      type: String,
    },
    // 图片格式
    type: {
      type: String,
    },
    // 图片比例
    ratio: {
      type: Array,
      required: true,
      validator: (array) => {
        return array.length === 2;
      },
    },
    // 上传loading
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    aspectRatio() {
      return this.ratio[0] / this.ratio[1];
    },
    ratioText() {
      return `${this.ratio[0]} : ${this.ratio[1]}`;
    },
  },
  methods: {
    // 旋转
    rotate() {
      this.$refs.cropper.rotate(90);
    },
    cropper() {
      const base64 = this.$refs.cropper
        .getCroppedCanvas()
        // 压缩率0.7
        .toDataURL(this.type, 0.7);
      this.$emit("cropper", base64);
    },
  },
};
</script>

<style lang="stylus" scoped>
.cropper-box {
  flex: 3;
}

.cropper-info {
  flex: 1;
}

.infox-box {
  line-height: 28px;
}
</style>
