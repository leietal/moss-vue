/**
 * 1. selectedRowKeys：选中行的key
 * 2. selectedRows：选中行的数据
 * 3. rowSelection：行选中对象
 */
const TABLE_SELECT_DATA = {
  selectedRowKeys: [],
  selectedRows: [],
};
export const mixinTableSelect = {
  data() {
    return {
      ...TABLE_SELECT_DATA,
    };
  },
  computed: {
    rowSelection() {
      const that = this;
      return {
        fixed: true,
        selectedRowKeys: that.selectedRowKeys,
        selectedRows: that.selectedRows,
        onChange(selectedRowKeys, selectedRows) {
          that.selectedRowKeys = selectedRowKeys;
          that.selectedRows = selectedRows;
        },
      };
    },
  },
  methods: {
    clearSelected() {
      Object.assign(this, { ...TABLE_SELECT_DATA });
    },
  },
};

/**
 * modalConfig：modal的配置
 * visible：是否显示
 * initModal：显示modal的时候触发的事件
 */
export const mixinModal = {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(this.initModal);
        }
      },
      immediate: true,
    },
  },
  methods: {
    initModal() {},
    handleCancel() {
      this.$emit("cancel");
    },
    handleOk() {
      this.$emit("ok");
    },
  },
};

const DEFAULT_PAGINATION = {
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
};

const DEFAULT_TABLE_DATA = {
  bordered: true,
  size: "small",
  // 初始查询参数
  params: {},
  // 表格列
  columns: [],
  // 表格唯一ID
  rowKey(data, index) {
    return index;
  },
  // 表格数据
  dataSource: [],
};

/**
 * 简单的分页表格（即没有查询表单）
 */
export const mixinPageTable = {
  data() {
    return {
      tableData: {
        ...DEFAULT_TABLE_DATA,
        pagination: { ...DEFAULT_PAGINATION },
      },
    };
  },
  methods: {
    // 初始化查询条件
    initParams(data) {
      if (!data) {
        data = this.tableData.params;
      }
      this.tableData.params = { ...data };
    },
    // 查询（翻页也用这个）
    query(pagination = {}, params = {}) {
      this.paginate(pagination, params);
    },
    // 分页查询数据
    paginate(pagination = {}, params = {}) {
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
