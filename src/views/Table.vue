<template>
  <div class="container">
    <a-card size="small">
      <a-form :form="queryForm">
        <a-row :gutter="20">
          <a-col :span="6">
            <a-form-item label="用户名">
              <a-input
                allowClear
                v-decorator="formRules.username"
                @keyup.enter="$refs['password'].focus()"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="密码">
              <a-input
                ref="password"
                allowClear
                v-decorator="formRules.password"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="日期">
              <xs-range-picker
                beginDate="beginDate2"
                endDate="endDate2"
                :form="queryForm"
                v-decorator="['date2']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="日期">
              <xs-range-picker
                beginDate="beginDate3"
                endDate="endDate3"
                :form="queryForm"
                v-decorator="['date3']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item>
              <a-button type="primary" @click="query"> 查询 </a-button>
              <a-button type="default" @click="reset"> 重置 </a-button>
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
    title: "核销总额",
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
        username: [
          "username",
          {
            rules: [],
            normalize: (val) => {
              return val && val.trim();
            },
          },
        ],
        password: [
          "password",
          {
            rules: [],
          },
        ],
      },
    };
  },
  methods: {
    loadData(params) {
      console.log("%c=====>%o", "color:#fff;background:#f99", params);
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
  },
  mounted() {
    this.initParams({
      beginDate: moment(),
      endDate: moment(),
      type: 1,
    });
    this.query();
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
