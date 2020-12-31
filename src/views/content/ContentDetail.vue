<template>
  <div class="page">
    <div class="page-content">
      <a-spin :spinning="!!loading">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <a-form-model
          ref="form"
          :model="content"
          :rules="rules"
          layout="vertical"
        >
          <a-row :gutter="20">
            <a-col :span="24">
              <a-form-model-item label="标题" prop="title">
                <a-input v-model="content.title" allowClear />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="24">
              <a-form-model-item label="内容" prop="text">
                <a-textarea
                  v-model="content.text"
                  allowClear
                  :rows="4"
                ></a-textarea>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="24">
              <a-form-model-item label="描述" prop="description">
                <a-textarea
                  v-model="content.description"
                  allowClear
                  :rows="4"
                ></a-textarea>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="24">
              <a-form-model-item label="封面" prop="coverImg">
                <div class="upload-wrap">
                  <div class="upload-left">
                    <a-spin :spinning="uploading">
                      <a-upload
                        list-type="picture-card"
                        class="cover-uploader"
                        :show-upload-list="false"
                        :customRequest="uploadCoverImg"
                        accept="image/*"
                        :beforeUpload="beforeUpload"
                      >
                        <img
                          v-if="coverImgSrc"
                          :src="coverImgSrc"
                          alt=""
                          class="cover-img"
                        />
                        <div v-else>
                          <a-icon type="plus" />
                          <div class="ant-upload-text">上传图片</div>
                        </div>
                      </a-upload>
                    </a-spin>
                  </div>
                  <div class="upload-right">
                    <div class="tip-title">上传提示：</div>
                    <div>1. 文件大小最大为2M</div>
                    <div>
                      2.
                      推荐上传宽高比例为4:3的图片，推荐尺寸：宽=200px，高=120px
                    </div>
                  </div>
                </div>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-model-item label="栏目" prop="categoryId">
                <a-select v-model="content.categoryId" allowClear>
                  <a-select-option :value="1">行业新闻</a-select-option>
                  <a-select-option :value="2">政策新闻</a-select-option>
                  <a-select-option :value="3">公司新闻</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :span="6">
              <a-form-model-item label="作者" prop="author">
                <a-input v-model="content.author" allowClear />
              </a-form-model-item>
            </a-col>

            <a-col :span="6">
              <a-form-model-item label="编辑" prop="editor">
                <a-input v-model="content.editor" allowClear />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>
    </div>
    <div class="page-footer">
      <a-button type="link" icon="arrow-left" @click="$router.back()">
        返回
      </a-button>
      <a-button
        type="primary"
        icon="save"
        @click="save"
        :loading="loading == 'save'"
        >保存</a-button
      >
      <a-button
        type="danger"
        icon="delete"
        @click="remove"
        :loading="loading == 'remove'"
        >删除</a-button
      >
    </div>
  </div>
</template>

<script>
import {
  createContent,
  modifyContent,
  removeContent,
  findContent,
} from "@/services/content";
import { getDownloadUrl, uploadFile, editorImageExtend } from "@/services/file";

const columns = [
  {
    title: "企业名称",
    dataIndex: "name",
    key: "name1",
  },
  {
    title: "联系人姓名",
    dataIndex: "name",
    key: "name2",
    width: 200,
  },
  {
    title: "联系人手机",
    dataIndex: "name",
    key: "name3",
    width: 140,
    align: "center",
  },
  {
    title: "提交时间",
    dataIndex: "name",
    key: "name4",
    align: "center",
  },
];

export default {
  components: {},
  data() {
    return {
      loading: null,
      uploading: false,
      content: {
        text: null,
        coverImg: null,
        categoryId: null,
      },
      rules: {
        title: [
          { required: true, message: "标题不能为空", whitespace: true },
          { max: 200, message: "不能大于200个字符", whitespace: true },
        ],
        text: [
          { required: true, message: "内容不能为空", whitespace: true },
          { max: 10000, message: "不能大于10000个字符", whitespace: true },
        ],
        description: [
          { required: true, message: "描述不能为空", whitespace: true },
          { max: 200, message: "不能大于200个字符" },
        ],
        coverImg: [
          { required: true, message: "封面不能为空", trigger: "blur" },
        ],
        categoryId: [{ required: true, message: "栏目不能为空" }],
      },
    };
  },
  computed: {
    coverImgSrc() {
      return getDownloadUrl(this.content.coverImg);
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    beforeUpload(file) {
      if (!file) {
        return false;
      }
      if (parseInt(file.size / 1024 / 1024) > 3) {
        this.$message.error("只能上传3M以内的图片文件");
        return false;
      }
      return true;
    },
    uploadCoverImg({ file }) {
      this.uploading = true;
      uploadFile(file)
        .then(({ data: { fileCode } }) => {
          this.$message.success("上传成功");
          this.content.coverImg = fileCode;
          this.$refs["form"].clearValidate("coverImg");
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    save() {
      this.loading = "save";
      const { content } = this;
      const modify = !!content.id;
      this.$refs["form"]
        .validate()
        .then(() => {
          const action = modify ? modifyContent : createContent;
          return action(content);
        })
        .then(({ data }) => {
          this.$message.success("保存成功");
          if (!modify) {
            this.$router.replace(`/content_detail/${data.id}`);
          }
        })
        .finally(() => {
          this.loading = null;
        });
    },
    remove() {
      const { id } = this;
      if (!id) {
        this.$message.error("新闻不存在");
        return;
      }
      const self = this;
      this.$confirm({
        title: "系统提示",
        content: "确定要删除吗？",
        okType: "danger",
        onOk() {
          self.loading = "remove";
          removeContent(id)
            .then(() => {
              // 刷新数据
              self.$router.replace("/content");
            })
            .finally(() => {
              self.loading = null;
            });
        },
      });
    },
    loadData() {
      const { id } = this;
      if (!id) {
        return;
      }
      this.loading = "loadData";
      findContent(id)
        .then(({ data }) => {
          this.content = data || {};
        })
        .finally(() => {
          this.loading = null;
        });
    },
  },
  watch: {
    id: {
      handler() {
        this.loadData();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.page {
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}
.page-content {
  padding: 20px;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  background: #fff;
}
.page-footer {
  flex-grow: 0;
  flex-shrink: 0;
  background: #fff;
  border-top: 1px solid rgb(235, 237, 240);
  display: flex;
  height: 52px;
  justify-content: center;
  align-items: center;
}
.page-footer > .ant-btn:not(:last-child) {
  margin-right: 8px;
}
.upload-wrap {
  display: flex;
}
.upload-left {
  flex-grow: 0;
  flex-shrink: 0;
}
.upload-left .cover-img {
  width: 200px;
  height: 120px;
}
.upload-right {
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: 20px;
  color: #888;
  line-height: 24px;
}
.upload-right .tip-title {
  font-weight: bold;
  color: #666;
}
</style>

<style>
.cover-uploader .ant-upload {
  width: 200px;
  height: 120px;
  margin: 0;
}
.quill-editor .ql-container {
  height: 400px !important;
}
.ql-snow .ql-tooltip {
  left: 0;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}
.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>