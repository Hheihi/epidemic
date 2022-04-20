<template>
  <div class="baldy-upload-picture">
    <a-avatar
      icon="file-image"
      :class="preview"
      :src="url"
      :style="choiceStyle"
      :shape="shape"
      :size="100"
    />
    <a-upload
      class="uploader mt10"
      list-type="text"
      accept=".jpg,.jpeg,.png"
      :name="name"
      :disabled="disabled"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :customRequest="() => {}"
      @change="handleChange"
    >
      <a-button><a-icon type="upload" />上传</a-button>
    </a-upload>
    <PictureCropper
      :visible="showCropperModal"
      :img="cropperBase64"
      :ratio="shape === 'square' ? ratio : [1, 1]"
      :loading="uploading"
      :type="type"
      @close="showCropperModal = false"
      @cropper="uploadHandler"
    />
  </div>
</template>

<script>
import { ResourceApi } from "@/api";
import PictureCropper from "@/components/PictureCropper.vue";
import { Message } from "ant-design-vue";
import { FILE_TO_BASE64, BASE64_TO_FILE } from "@/utils/file-handlers";
export default {
  name: "UploadPicture",
  components: {
    PictureCropper,
  },
  props: {
    url: {
      type: String,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 上传文件服务器获取的名称
    name: {
      type: String,
      default: "picture",
    },
    // 图片比例(只对图片生效，shape为circle时ratio不生效)
    ratio: {
      type: Array,
      validator: (array) => {
        return array.length === 2;
      },
    },
    // 图片方形还是圆形
    shape: {
      type: String,
      default: "square",
      validator: (val) => {
        return ["square", "circle"].includes(val);
      },
    },
  },
  computed: {
    choiceStyle() {
      return {
        width: "100px",
        height: "100px",
        // 根据原始比例得出的计算公式
        fontSize: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    },
    preview() {
      return { opacityBg: this.url, "picture-item": true };
    },
  },
  data() {
    return {
      originalName: "",
      type: "image/jpeg",
      showCropperModal: false,
      cropperBase64: null,
      uploading: false,
    };
  },
  methods: {
    // 校验上传文件
    beforeUpload({ name, type }) {
      // 校验
      if (!["image/jpeg", "image/png"].includes(type)) {
        Message.error("图片仅支持jpg或png格式");
        return false;
      }
      // 记录
      this.type = type;
      this.originalName = name;
      return true;
    },
    // 上传完成转入到裁剪模式
    async handleChange({ file: { originFileObj } }) {
      this.cropperBase64 = await FILE_TO_BASE64(originFileObj);
      this.showCropperModal = true;
    },
    // 上传文件
    async uploadHandler(base64) {
      this.uploading = true;
      // base64转文件
      const file = await BASE64_TO_FILE(base64, this.originalName);
      let formData = new FormData();
      formData.append("file", file);
      // formData.set('file', file)
      const { data } = await ResourceApi.uploadFile(
        // sid: JSON.parse(sessionStorage.getItem("id")),
        formData
      );
      console.log(data);
      this.uploading = false;
      if (data.code === 200) {
        this.$emit("upload-complete", data.data.imgUrl);
        this.showCropperModal = false;
        this.cropperBase64 = null;
        const saveData = await ResourceApi.saveUploadFile({
          imgUrl: data.data.imgUrl,
          media: data.data.media,
          fileName: data.data.fileName,
          originName: data.data.originName,
          size: data.data.size,
          sid: sessionStorage.getItem("id"),
        });
        if (saveData.data.code == 200) {
          Message.success("文件上传成功");
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.baldy-upload-picture {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
