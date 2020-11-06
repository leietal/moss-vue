<template>
  <div class="container">
    <a-page-header class="header" title="带查询条件的表格" sub-title="mixins" />
    <a-card size="small">
      <a-form :form="queryForm">
        <a-row :gutter="20">
          <a-col :span="6">
            <a-form-item label="姓名">
              <a-input allowClear v-decorator="formRules.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="创建日期">
              <ms-range-picker :form="queryForm" v-decorator="['createDate']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item>
              <a-button type="primary" @click="query">查询</a-button>
              <a-button type="default" @click="reset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-table
      v-bind="tableData"
      :scroll="{ x: 1000, y: 400 }"
      @change="query"
    ></a-table>
  </div>
</template>

<script>
import moment from "moment";
import { mixinPageTable } from "@/commons/mixins";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
];

export default {
  mixins: [mixinPageTable],
  components: {},
  data() {
    return {
      tableData: { columns },
      formRules: {
        name: [
          "name",
          {
            rules: [{ required: true }],
            normalize: (val) => {
              return val && val.trim();
            },
          },
        ],
      },
    };
  },
  methods: {
    loadData(params) {
      const data = {
        data: {
          entityList: [
            { id: 1, name: "aaa" },
            { id: 3, name: "bbb" },
            { id: 3, name: "ccc" },
            { id: 4, name: "ddd" },
          ],
          pageNo: 1,
          pageSize: 10,
          totalCount: 100,
        },
      };
      return Promise.resolve(data);
    },
    // 增强查询条件
    strengthenParams(params) {
      params.createDate = null;
    },
  },
  mounted() {
    const [beginDate, endDate] = [
      moment().format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.initParams({
      name: "123",
      createDate: [beginDate, endDate],
      type: 1,
    });
    this.query();
  },
};
</script>
