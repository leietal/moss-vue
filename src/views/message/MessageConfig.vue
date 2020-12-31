<template>
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
            <a-form-model-item label="模板编号" prop="title">
              <a-input v-model="queryModel.title" allowClear />
            </a-form-model-item>
          </a-col>

          <a-col :span="6">
            <a-form-model-item label="模板名称" prop="title">
              <a-input v-model="queryModel.title" allowClear />
            </a-form-model-item>
          </a-col>

          <a-col :span="6">
            <a-form-model-item label="级别" prop="categoryId">
              <a-select v-model="queryModel.categoryId" allowClear>
                <a-select-option value="">全部</a-select-option>
                <a-select-option :value="1">平台</a-select-option>
                <a-select-option :value="2">机构</a-select-option>
              </a-select>
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
        >新增</a-button
      >
    </div>

    <a-table
      v-bind="tableData"
      @change="query"
      :scroll="{ x: 1600, y: 360 }"
      :loading="loading"
      :customRow="customRow"
      :rowClassName="rowClassName"
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
</template>

<script>
import { mixinPageTable } from "@/mixins";
import { removeContent, pageContent } from "@/services/content";
import { getDownloadUrl } from "@/services/file";

const columns = [
  {
    title: "模板编号",
    dataIndex: "selected",
    key: "selected",
    width: 110,
    align: "center",
    scopedSlots: { customRender: "coverImg" },
  },
  {
    title: "模板名称",
    dataIndex: "title",
    key: "title",
    scopedSlots: { customRender: "contentTitle" },
  },
  {
    title: "级别",
    dataIndex: "categoryName",
    key: "categoryName",
    width: 120,
    align: "center",
  },
  {
    title: "分类",
    dataIndex: "description",
    key: "description",
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
      selectedRow: null,
      loading: false,
      queryModel: {},
      queryRules: {},
      tableData: {
        columns,
        dataSource: [
          { id: 1, title: "吞吞吐吐" },
          { id: 2, title: "吞吞吐吐" },
          { id: 3, title: "吞吞吐吐" },
          { id: 4, title: "吞吞吐吐" },
          { id: 5, title: "吞吞吐吐" },
          { id: 6, title: "吞吞吐吐" },
          { id: 7, title: "吞吞吐吐" },
          { id: 8, title: "吞吞吐吐" },
          { id: 9, title: "吞吞吐吐" },
          { id: 10, title: "吞吞吐吐" },
        ],
      },
    };
  },
  filters: {
    getDownloadUrl,
  },
  computed: {},
  methods: {
    rowClassName(record) {
      return this.selectedRow == record.id ? "active" : "";
    },
    customRow(record) {
      return {
        props: {},
        on: {
          // 事件
          click: (event) => {
            this.$nextTick(() => {
              this.selectedRow = record.id;
            });

            console.log("%c============>", "color:#f00", event);
          }, // 点击行
          dblclick: (event) => {},
          contextmenu: (event) => {},
          mouseenter: (event) => {}, // 鼠标移入行
          mouseleave: (event) => {},
        },
      };
    },
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
    // this.query();
  },
};
</script>

<style scoped>
.cover-img {
  height: 60px;
  width: 80px;
}
</style>

<style>
.ant-table-row.active:hover td,
.ant-table-row.active td {
  background-color: #d1e1ff !important;
}
</style>