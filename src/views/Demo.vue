<template>
  <div class="container">
    <a-form layout="inline" :form="queryForm">
      <a-form-item label="企业名称" whitespace="true">
        <a-input v-decorator="['companyName', { rules: [] }]" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="query">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-form-item>
    </a-form>
    <a-table
      bordered
      size="small"
      rowKey="id"
      @change="changePage"
      :columns="columns"
      :dataSource="tableData.entityList"
      :pagination="tableData.pagination"
      :scroll="{ x: 1660, y: 300 }"
    >
      <template slot="address" slot-scope="text, record">
        <a-popconfirm title="确定要删除吗？" @confirm="changeAddress(record)">
          <a-switch :checked="!!record.address" />
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mixinPage, mixinQuery } from "@/commons/mixins";
import demoData from "@/views/demo.json";

const columns = [
  {
    title: "Phone",
    dataIndex: "phone",
    // 合并单元格
    customRender: (text, row, index) => {
      const obj = {
        children: text,
        attrs: {
          rowSpan: row.rowSpan || 0
        }
      };
      return obj;
    }
  },
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Home phone",
    dataIndex: "tel"
  },
  {
    title: "Address",
    dataIndex: "address",
    scopedSlots: { customRender: "address" }
  }
];

export default {
  mixins: [mixinPage, mixinQuery],
  data() {
    return {
      columns
    };
  },
  methods: {
    changeAddress(record) {
      record.address = !!!record.address;
    },
    loadData() {
      let result = {
        data: {
          entityList: demoData,
          pageNo: 1,
          pageSize: 10,
          totalCount: 110
        }
      };
      return new Promise((resolve, reject) => {
        resolve(result);
      });
    }
  },
  mounted() {
    this.$nextTick(this.paginate);
  }
};
</script>


<style scoped>
.container {
  background-color: #fff;
  border: 1px solid #e1e5e9;
  padding: 10px;
  border-radius: 2px;
  margin-bottom: 10px;
}
</style>