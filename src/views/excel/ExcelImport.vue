<template>
  <div class="container">
    <a-tabs>
      <a-tab-pane key="1" tab="未读">
        <div class="container">
          <a-card size="small">
            <a-form-model
              ref="queryForm"
              :model="queryModel"
              :rules="queryRules"
              layout="vertical"
            >
              <a-row :gutter="20">
                <a-col :span="6">
                  <a-form-model-item label="分类" prop="title">
                    <a-input v-model="queryModel.title" allowClear />
                  </a-form-model-item>
                </a-col>

                <a-col :span="6">
                  <a-form-model-item label="通知标题" prop="title">
                    <a-input v-model="queryModel.title" allowClear />
                  </a-form-model-item>
                </a-col>

                <a-col :span="6">
                  <a-form-model-item label="创建时间" prop="createTime">
                    <xs-range-picker
                      v-model="queryModel.createTime"
                      :form="queryModel"
                      begin="createTimeStart"
                      end="createTimeEnd"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :span="24" class="form-action-bar">
                  <a-button type="primary" @click="query">查询</a-button>
                  <a-button @click="reset">重置</a-button>
                </a-col>
              </a-row>
            </a-form-model>
          </a-card>

          <div>
            <a-button type="primary" @click="$router.push('/content_detail')"
              >归档</a-button
            >
          </div>

          <a-table
            v-bind="tableData"
            @change="query"
            :scroll="{ x: 1000, y: 360 }"
            :loading="loading"
          >
            <template slot="contentTitle" slot-scope="text, record">
              <a
                href="javascript:void(520)"
                @click="$router.push(`/content_detail/${record.id}`)"
                >{{ text }}</a
              >
            </template>
            <template slot="coverImg" slot-scope="text">
              <img
                :src="text | getDownloadUrl"
                alt=""
                class="cover-img"
                v-if="text"
              />
            </template>
            <template slot="createTime" slot-scope="text">
              {{ text | formatDateTime }}
            </template>
            <template slot="releaseTime" slot-scope="text">
              {{ text | formatDateTime }}
            </template>
            <template slot="action" slot-scope="text, record">
              <a
                href="javascript:void(520)"
                @click="$router.push(`/content_detail/${record.id}`)"
                >编辑</a
              >
              <a-divider type="vertical" />
              <a href="javascript:void(520)" @click="remove(record.id)">删除</a>
            </template>
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="已读"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mixinPageTable } from "@/mixins";
import { removeContent, pageContent } from "@/services/content";
import { getDownloadUrl } from "@/services/file";

const columns = [
  {
    title: "分类",
    dataIndex: "coverImg",
    key: "coverImg",
    width: 110,
    align: "center",
    scopedSlots: { customRender: "coverImg" },
  },
  {
    title: "消息标题",
    dataIndex: "title",
    key: "title",
    scopedSlots: { customRender: "contentTitle" },
  },
  {
    title: "消息内容",
    dataIndex: "categoryName",
    key: "categoryName",
    width: 120,
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 180,
    align: "center",
    scopedSlots: { customRender: "createTime" },
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 120,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  mixins: [mixinPageTable],
  data() {
    return {
      loading: true,
      queryModel: {},
      queryRules: {},
      tableData: {
        columns,
      },
    };
  },
  filters: {
    getDownloadUrl,
  },
  computed: {},
  methods: {
    query(pagination = {}, params = {}) {
      this.loading = true;
      this.$refs["queryForm"]
        .validate()
        .then(() => {
          Object.assign(params, this.queryModel);
          params.createTime = null;
          params.releaseTime = null;
          return this.paginate(pagination, params);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    remove(id) {
      const self = this;
      this.$confirm({
        title: "系统提示",
        content: "确定要删除吗？",
        okType: "danger",
        onOk() {
          removeContent(id).then(() => {
            // 刷新数据
            self.query();
          });
        },
      });
    },
    reset() {
      this.$refs["queryForm"].resetFields();
    },
    loadData: pageContent,
  },
  mounted() {
    this.query();
  },
};
</script>

<style scoped>
.cover-img {
  height: 60px;
  width: 80px;
}
</style>