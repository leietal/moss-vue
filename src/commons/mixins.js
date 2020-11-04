const DEFAULT_TABLE_DATA = {
  bordered: true,
  size: "small",
  // 初始查询参数
  params: {},
  // 表格列
  columns: [],
  // 表格唯一ID
  rowKey() {
    return parseInt(Math.random() * 1e10);
  },
  // 表格数据
  dataSource: [],
  // 分页对象
  pagination: {
    size: "small",
    current: 0,
    pageSize: 0,
    total: 0,
    showQuickJumper: true,
    pageSizeOptions: ["10", "20", "50", "100"],
    showSizeChanger: true,
    showTotal(total, range) {
      return `共${total}条`;
    },
  },
};

/**
 * 简单的分页表格（即没有查询表单）
 */
export const mixinSimplePageTable = {
  data() {
    return {
      tableData: {
        ...DEFAULT_TABLE_DATA,
      },
    };
  },
  methods: {
    // 初始化查询条件
    initParams(data) {
      if (!data) {
        data = this.tableData.params;
      }
      this.tableData.params = data;
    },
    // 查询（翻页也用这个）
    query(pagination) {
      this.paginate({ pagination, params: { ...this.tableData.params } });
    },
    // 分页查询数据
    paginate({ pagination = {}, params = {} } = {}) {
      const { current: pageNo, pageSize } = pagination;
      this.loadData({ pageNo, pageSize, ...params }).then(
        ({ data: { entityList, ...page } }) => {
          Object.assign(this.tableData.pagination, {
            current: page.pageNo,
            pageSize: page.pageSize,
            total: page.totalCount,
          });
          this.tableData.dataSource = entityList;
        }
      );
    },
    // 调用后台接口的查询方法（需要重写该方法）
    loadData() {
      return new Promise();
    },
  },
};

/**
 * 分页表格，带查询表单
 */
export const mixinPageTable = {
  mixins: [mixinSimplePageTable],
  beforeCreate() {
    this.queryForm = this.$form.createForm(this);
  },
  data() {
    return {
      expand: false,
    };
  },
  methods: {
    // 展开或收缩高级查询
    changeExpand() {
      this.expand = !this.expand;
    },
    // 初始化查询条件
    initParams(data) {
      if (!data) {
        data = this.tableData.params;
      }
      this.tableData.params = data;
      if (!data) {
        return;
      }
      const fields = this.queryForm.getFieldsValue();
      for (let key in data) {
        if (!fields.hasOwnProperty(key)) {
          this.queryForm.getFieldDecorator(key, { preserve: true });
        }
      }
      this.queryForm.setFieldsValue(data);
    },
    // 查询（翻页也用这个）
    query(pagination) {
      this.queryForm.validateFields((errors, values) => {
        if (errors) {
          return;
        }
        this.strengthenParams(values);
        this.paginate({ pagination, params: { ...values } });
      });
    },
    // 增强查询条件
    strengthenParams(values) {},
    // 重置查询参数
    reset() {
      this.queryForm.resetFields();
      this.initParams();
    },
  },
};
