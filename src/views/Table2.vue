<template>
  <div class="container">
    <a-table
      v-bind="tableData"
      :scroll="{ x: 1000, y: 400 }"
      @change="query"
    ></a-table>
  </div>
</template>

<script>
import moment from "moment";
import { mixinSimplePageTable } from "@/commons/mixins";

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
  mixins: [mixinSimplePageTable],
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
