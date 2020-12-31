<template>
  <a-modal
    title="文件上传"
    :visible="visible"
    :maskClosable="false"
    @cancel="handleCancel"
    @ok="handleOk"
    :footer="null"
    destroyOnClose
  >
    <a-upload-dragger
      name="file"
      :beforeUpload="beforeUpload"
      :fileList="fileList"
      :remove="removeFile"
    >
      <span v-if="hasFile" class="ant-upload-drag-selected">
        <p class="ant-upload-drag-icon">
          <a-icon type="check-circle" />
        </p>
        <p class="ant-upload-text">重新选择文件（点击或拖拽文件到当前区域）</p>
      </span>
      <span v-else>
        <p class="ant-upload-drag-icon">
          <a-icon type="file-excel" />
        </p>
        <p class="ant-upload-text">选择文件（点击或拖拽文件到当前区域）</p>
      </span>
    </a-upload-dragger>

    <div class="xs-upload-footer">
      <a-button block type="primary" @click="upload" :disabled="!hasFile"
        >上传</a-button
      >
    </div>
  </a-modal>
</template>
<script>
import { uploadFile } from "@/services/file";
import { mixinModal } from "@/mixins";

export default {
  name: "XsUpload",
  mixins: [mixinModal],
  data() {
    return { fileList: [] };
  },
  computed: {
    hasFile() {
      const { fileList } = this;
      return fileList && fileList.length;
    },
  },
  methods: {
    initModal() {
      this.fileList = [];
    },
    removeFile(file) {
      const idx = this.fileList.findIndex((item) => {
        return item.uid == file.uid;
      });
      this.fileList.splice(idx);
    },
    upload() {
      if (!this.hasFile) {
        this.$message.error("请选择您要上传的文件");
        return;
      }
      uploadFile(this.fileList[0]).then(({ data }) => {
        // 返回上传结果并关闭窗口+清除数据
        this.$emit("uploaded", data);
        this.handleCancel(true);
      });
    },
    beforeUpload(file) {
      this.fileList = [file];
    },
  },
};
</script>

<style scoped>
.ant-upload.ant-upload-drag p.ant-upload-drag-icon {
  margin: 20px auto;
}
.ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
  color: #585858;
}
.ant-upload.ant-upload-drag
  .ant-upload-drag-selected
  p.ant-upload-drag-icon
  .anticon {
  color: #52c41a;
}
.ant-upload.ant-upload-drag p.ant-upload-text {
  color: #585858;
  margin: 20px auto;
  font-size: 14px;
}
.xs-upload-footer {
  margin: 10px auto;
  text-align: center;
}
</style>