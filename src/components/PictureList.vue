<template>
  <div class="baldy-picture-list">
    <span class="list-title">我的资源</span>
    <a-spin
      class="customLoading"
      wrapperClassName="customLoading"
      :spinning="loading"
    />
    <a-empty
      v-if="!pictures.length && !loading"
      class="customEmpty"
      description="暂无资源"
    />
    <template v-for="(pictureRow, rowIndex) in pictures">
      <a-row :key="rowIndex">
        <template v-for="(picture, colIndex) in pictureRow">
          <a-col :key="colIndex" :span="6">
            <div
              :class="{
                'picture-item-box': true,
                active: picture.url === resourceUrl
              }"
              @click="change(picture)"
            >
              <a-avatar
                shape="square"
                icon="file-image"
                class="picture-item opacityBg"
                :size="128"
                :src="picture.url"
              />
             <!-- <img :src="`/file/${picture.url}`" alt=""> -->
              <div class="picture-mask">
                <div class="btns">
                  <a-icon
                    class="mr10"
                    type="eye"
                    @click.stop="previewHandler(picture)"
                  />
                  <a-popconfirm
                    title="删除后无法恢复"
                    ok-text="确认删除"
                    :disabled="deleteLoading"
                    @confirm="
                      deleteHandler(picture.id, picture.file_name, picture.url)
                    "
                  >
                    <a-icon type="delete" @click.stop="() => {}" />
                  </a-popconfirm>
                </div>
                <span class="origin-name pl5 pr5">
                  {{ picture.origin_name }}
                </span>
              </div>
            </div>
          </a-col>
        </template>
      </a-row>
    </template>
    <CustomPagination
      size="small"
      :page="queryParam.page"
      :pageSize="queryParam.size"
      :total="total"
      :switch-page-size="false"
      @change="pageChange"
    />
    <!-- 预览图片 -->
    <a-modal
      v-model="preview"
      width="700px"
      :destroy-on-close="true"
      :footer="null"
      :closable="false"
    >
      <div class="img-info-box not-select" v-if="previewPic">
        <div class="img-preview">
          <img alt="preview" :src="previewPic.url" width="100%" />
        </div>
        <div class="img-info pl10">
          <a-row class="info-item-row mb5">
            <a-col class="info-item-label" :span="8">文件名：</a-col>
            <a-col class="info-item" :span="16">
              {{ previewPic.origin_name }}
            </a-col>
          </a-row>
          <a-row class="info-item-row mb5">
            <a-col class="info-item-label" :span="8">文件大小：</a-col>
            <a-col class="info-item" :span="16">
              {{ transitionBit(previewPic.size) }}
            </a-col>
          </a-row>
          <a-row class="info-item-row mb5">
            <a-col class="info-item-label" :span="8">上传日期：</a-col>
            <a-col class="info-item" :span="16">
              {{ timeFormat(previewPic.create_time) }}
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { chunk } from 'lodash'
import CustomPagination from '@/components/CustomPagination.vue'
import { ResourceApi } from '@/api'
import { TRANSITION_BIT } from '@/utils/common-handlers'
import moment from 'moment'
export default {
  name: 'PictureList',
  components: {
    CustomPagination,
  
  },
  props: {
    resourceUrl: {
      type: String,
      require: true
    }
  },
  computed: {
    pictures () {
      return chunk(this.pictureList, 4)
    }
  },
  data () {
    return {
      pictureList: [],
      preview: false,
      previewPic: null,
      total: 0,
      loading: false,
      deleteLoading: false,
      queryParam: {
        id:JSON.parse(sessionStorage.getItem('id')) ,
        page: 1,
        size:8,
      }
    }
  },
  created () {
    this.queryList()
  },
  methods: {
    async pageChange (page) {
      this.queryParam.page = page
      await this.queryList()
    },
    async queryList () {
      this.loading = true
      const {  data } = await ResourceApi.getResourceList(this.queryParam)
      this.loading = false
      if (data.code === 200) {
        this.pictureList = data.data
        this.total = data.total
        
      }
    },
    previewHandler (picture) {
    
      this.preview = true
      this.previewPic = picture
    },
    transitionBit (bit) {
      return TRANSITION_BIT(bit)
    },
    timeFormat (timestrap) {
      return moment(+timestrap).format('YYYY-MM-DD HH:mm:ss')
    },
    change (picture) {
      this.$emit('change', picture.url)
    },
    async deleteHandler (id, name, url) {
      this.deleteLoading = true
      const { data } = await ResourceApi.deleteFile(id, name)
      if (data.code === 200) {
        if (this.resourceUrl === url) {
          this.$emit('change', '')
        }
        await this.queryList()
        this.deleteLoading = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.baldy-picture-list
  position relative
  border 1px solid #eaeaea
  border-radius 5px
  min-height 400px
  padding 10px
  .customLoading,.customEmpty
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
  .list-title
    position absolute
    top -10px
    left 50px
    padding 0px 10px
    background #fff
    font-size 14px
    font-weight 600
    color #b2b2b2
  .active
    box-shadow 0px 0px 1px 2px #088dff
    border-radius 4px
  .picture-item-box
    position relative
    overflow hidden
    width 128px
    margin 10px auto
    border 1px solid #eaeaea
    border-radius 4px
    .picture-mask
      position absolute
      left 0px
      width 128px
      height 128px
      top 0px
      opacity 0
      color #fff
      text-align center
      background-color #595959
      border-radius 4px
      transition opacity 0.3s
      .btns
        margin-top 40px
        font-size 20px
      .origin-name
        bottom 5px
        left 0px
        width 100%
        position absolute
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    &:hover
      .picture-mask
        opacity 0.8
.img-info-box
  display flex
  .img-preview
    flex 2
  .img-info
    flex 1
    word-break break-all
    .info-item-label
      text-align right
</style>
