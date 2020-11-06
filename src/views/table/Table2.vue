<template>
  <div class="container">
    <a-page-header
      class="header"
      title="不带查询条件的表格"
      sub-title="mixins"
    />
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
    title: "姓名",
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
    };
  },
  methods: {
    loadData(params) {
      console.log("loadData=====>%o", params);
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
      beginDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      type: 1,
    });
    this.query();
  },
};
</script>