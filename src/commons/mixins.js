/**
 * 1. tableData：表格数据存储的对象
 * 2. changePage：分页事件处理方法
 * 3. paginate：分页查询
 * 4. loadData：加载数据的方法
 */
export const mixinPage = {
  data() {
    return {
      tableData: {
        entityList: [],
        pagination: {
          current: 0,
          pageSize: 0,
          total: 0,
          showQuickJumper: true,
          pageSizeOptions: ["20", "50", "100"],
          showSizeChanger: true,
          showTotal(total, range) {
            return `共${total}条`;
          },
        },
      },
    };
  },
  methods: {
    // 分页
    changePage(pagination) {
      this.paginate({ pagination });
    },
    // 查询数据
    paginate({ pagination = {}, params = {} } = {}) {
      const { current: pageNo, pageSize } = pagination;
      this.loadData({ pageNo, pageSize, ...params }).then(
        ({ data: { entityList, ...pp } }) => {
          let p = this.tableData.pagination;
          p.current = pp.pageNo;
          p.pageSize = pp.pageSize;
          p.total = pp.totalCount;
          this.tableData.entityList = entityList;
        }
      );
    },
    loadData() {
      return new Promise();
    },
  },
};

/**
 * 1. queryForm：表单的form名称
 * 2. query：查询事件的方法
 * 3. reset：重置事件的方法
 * 4. queryPlus/resetPlus：queyr/reset的增强处理方法
 */
export const mixinQuery = {
  created() {
    this.queryForm = this.$form.createForm(this);
  },
  methods: {
    query() {
      this.queryForm.validateFields((errors, values) => {
        if (errors) {
          return;
        }
        let params = this.queryPlus(values);
        this.paginate({ params });
      });
    },
    reset() {
      this.queryForm.resetFields();
      this.resetPlus();
    },
    queryPlus(values) {
      return values;
    },
    resetPlus() {},
  },
};

/**
 * 1. selectedRowKeys：选中行的key
 * 2. selectedRows：选中行的数据
 * 3. rowSelection：行选中对象
 */
export const mixinTableSelect = {
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  computed: {
    rowSelection() {
      const that = this;
      return {
        fixed: true,
        columnTitle: "选择",
        selectedRowKeys: that.selectedRowKeys,
        selectedRows: that.selectedRows,
        onChange(selectedRowKeys, selectedRows) {
          that.selectedRowKeys = selectedRowKeys;
          that.selectedRows = selectedRows;
        },
      };
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
    visible(newVal) {
      if (newVal) {
        this.initModal();
      }
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
