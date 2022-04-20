<template>
  <div class="baldy-resource-choice">
    <a-avatar
      class="pointer preview"
      :icon="previewIcon"
      :style="choiceStyle"
      :shape="shape"
      :src="url"
      @click="visible = true"
    />
    <a-modal
      v-model="visible"
      width="1000px"
      :title="title"
      :destroy-on-close="true"
      :centered="true"
      :mask-closable="false"
      :after-close="closed"
      @ok="confirm"
    >
      <div class="baldy-resource-choice-box">
        <component
          class="box-left"
          :is="uploader"
          :url="resource || url"
          :shape="shape"
          :ratio="ratio"
          :name="name"
          @upload-complete="uploadComplete"
        />
        <component
          class="box-right"
          ref="resourceList"
          :is="listName"
          :resourceUrl="resource"
          @change="useResource"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { min } from 'lodash'
import UploadPicture from '@/components/UploadPicture'
import UploadVideo from '@/components/UploadPicture'
import PictureList from '@/components/PictureList'
import VideoList from '@/components/VideoList'

const uploader = {
  video: 'UploadVideo',
  picture: 'UploadPicture'
}
const listNames = {
  video: 'VideoList',
  picture: 'PictureList'
}
export default {
  name: 'CustomResourceChoice',
  model: {
    prop: 'url',
    event: 'change'
  },
  components: {
    UploadPicture,
    UploadVideo,
    PictureList,
    VideoList,
  },
  props: {
    // 资源地址可以使用v-model
    url: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 上传文件服务器获取的名称
    name: {
      type: String,
      default: 'file'
    },
    // 上传的格式
    media: {
      type: String,
      required: true,
      validator: val => {
        return ['video', 'picture'].includes(val)
      }
    },
    // Dom大小[宽，高]
    size: {
      type: Array,
      required: true,
      validator: val => {
        return val.length === 2
      }
    },
    // 默认的占位Icon
    previewIcon: {
      type: String,
      default: 'cloud-upload'
    },
    // 图片方形还是圆形(只对图片生效)
    shape: {
      type: String,
      default: 'square',
      validator: val => {
        return ['square', 'circle'].includes(val)
      }
    },
    // 图片比例(只对图片生效，shape为circle时ratio不生效)
    ratio: {
      type: Array,
      validator: array => {
        return array.length === 2
      }
    }
  },
  computed: {
    title () {
      return this.media === 'video' ? '选择视频' : '选择图片'
    },
    choiceStyle () {
      return {
        width: `${this.size[0]}px`,
        height: `${this.size[1]}px`,
        // 根据原始比例得出的计算公式
        fontSize: `${parseInt(min(this.size) * 0.5625)}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    uploader () {
      return uploader[this.media]
    },
    listName () {
      return listNames[this.media]
    }
  },
  data () {
    return {
      resource: '',
      visible: false
    }
  },
  methods: {
    uploadComplete (url) {
      // 设置url为新上传的url
      this.useResource(url)
      // 重新查询列表
      this.$refs.resourceList.queryList()
    },
    // 使用资源库上的图片
    useResource (url) {
      this.resource = url
    },
    // 点击确认时，更新外部的url
    confirm () {
      this.$emit('change', this.resource)
      this.visible = false
    },
    // Modal关闭时，resource要返显下当前的url，因为用户可能会取消
    closed () {
      this.resource = this.url
    }
  }
}
</script>

<style lang="stylus" scoped>
.baldy-resource-choice
  .preview
    margin 0px auto
.baldy-resource-choice-box
  display flex
  .box-left
    flex 1
  .box-right
    flex 2
</style>
