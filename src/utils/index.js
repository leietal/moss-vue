import moment from "moment";

/**
 * 前端分页转后端分页对象
 * @param {*} pagination
 */
export function paginationToPageable(pagination) {
  let { current: pageNo, pageSize } = pagination;
  return {
    pageNo,
    pageSize,
  };
}

/**
 * 后端分页转前端分页对象
 * @param {*} pageable
 */
export function pageableToPagination(pageable) {
  if (pageable) {
    let { pageNo: current, pageSize, totalCount: total } = pageable;
    return {
      current,
      pageSize,
      total,
      pageSizeOptions: ["10", "20", "50"],
      showSizeChanger: true,
      showTotal: (total) => {
        return `共 ${total} 条`;
      },
    };
  }
}

/**
 * 转换数据
 * @param {*} data
 */
export function transformParam(data) {
  data = data || {};
  data.params = data.params || {};
  data.pagination = data.pagination || {
    current: 1,
    pageSize: 10,
  };
  return data;
}

/**
 * 转换成下拉数据集
 * @param {*} data
 * @param {*} valueField
 * @param {*} labelField
 * @param {*} valueType
 */
export function transformOptions(
  data,
  valueField = "dictDetailCode",
  labelField = "dictDetailName",
  valueType = "string"
) {
  if (!data || !data.length) {
    return [];
  }
  return data.map((item) => {
    let value = item[valueField];
    if (valueType == "number") {
      value = Number(value);
    }
    return { value, label: item[labelField] };
  });
}

/**
 * 转换数据
 * @param {*} dict
 * @param {*} value
 */
const _transformDict = function(dict, value) {
  if (!dict || !dict.length) {
    return null;
  }
  const result = dict.filter((item) => item.value == value);
  return (result.length == 1 && result[0]) || null;
};

/**
 * 转换数据
 * @param {*} dict
 * @param {*} value
 */
export function transformDictName(dict, value) {
  const data = _transformDict(dict, value);
  return data && data.label;
}

const resourceType = {
  url: 1, // 菜单
  component: 2, // 组件
};

/**
 * 转换资源树
 * @param {*} data
 * @param {*} type
 */
export function transformTreeData(data, type) {
  type = type || resourceType.url;
  return data.map((item) => {
    let children =
      (item.children && transformTreeData(item.children, resourceType.url)) ||
      [];
    let components =
      (item.components &&
        transformTreeData(item.components, resourceType.component)) ||
      [];
    let subResource = children.concat(components);

    return {
      key: type + "_" + item.id,
      title: type == resourceType.component ? item.code : item.name,
      children: subResource,
    };
  });
}

/**
 * 转换菜单树
 * @param {*} data
 */
export function transformMenuData(data) {
  let arr = [];
  data.forEach(
    ({ id: key, icon, name: title, link: url, children, visible }) => {
      if (!visible) {
        return null;
      }
      let subResource =
        (children && children.length && transformMenuData(children)) || [];
      arr.push({
        key,
        icon,
        title,
        children: subResource,
        url,
      });
    }
  );
  return arr;
}

/**
 * 根据keyPath查找菜单数据
 * @param {*} data
 * @param {*} keyPath
 */
export function findCurrentMenu(data, keyPath) {
  let arr = data;
  keyPath.reverse().filter((key) => {
    arr.forEach((item) => {
      if (key == item.key) {
        arr = item.children && item.children.length ? item.children : item;
      }
    });
  });
  return arr;
}

/**
 * 百分比转数字
 * @param {*} value
 */
export function percentage2Number(value) {
  return (value && parseFloat(value / 100).toFixed(4)) || 0;
}

/**
 * 数字转百分比
 * @param {*} value
 */
export function number2Percentage(value) {
  return (value && parseFloat(value * 100).toFixed(2)) || 0;
}

/**
 * 格式化字符串
 * @param {String} text
 * @param {Object} data
 */
export function formatString(text, data) {
  if (!text || !data) {
    return text;
  }
  for (let k in data) {
    text = text.replace(new RegExp(`\\$\\{${k}\\}`, "gm"), data[k]);
  }
  return text;
}

/**
 * 格式化金额
 * @param {Number} text 需要格式化的字符
 * @param {Number} fixed 小数位
 */
export function formatNumber(text, fixed = 2) {
  if (!text) {
    return parseFloat(0).toFixed(fixed);
  }
  // numPre 小数点前面的整数
  // numSuf 小数点后面的小数
  // numSymbol 小数点前面的整数的符号/*  */
  // numPositive 小数点前面的整数绝对值
  let [numPre, numSuf] =
    parseFloat(text)
      .toFixed(fixed)
      .match(/(\-)?(\d+)/gim) || [];
  let [numSymbol = ""] = numPre.match(/(\-+)/gim) || [];
  let [numPositive] = numPre.match(/(\d+)/gim) || [];
  if (!numPositive) {
    return;
  }
  let arr = numPositive
    .toString()
    .split("")
    .reverse();
  // 替换次数
  let count = parseInt(arr.length / 3) - (arr.length % 3 == 0);
  for (let i = 1; i <= count; i++) {
    arr.splice(3 * i + (i - 1), 0, ",");
  }
  return numSymbol + arr.reverse().join("") + "." + numSuf.padEnd(2, "0");
}

/**
 * 格式化时间(moment)
 * @param {*} momen
 * @param {*} pattern
 */
export function transformDateTime(momen, pattern = "YYYY-MM-DD HH:mm:ss") {
  return momen && momen.format(pattern);
}

/**
 * 格式化时间(moment)
 * @param {*} momen
 * @param {*} pattern
 */
export function transformStartDate(momen) {
  return transformDateTime(momen, "YYYY-MM-DD 00:00:00");
}

/**
 * 格式化时间(moment)
 * @param {*} momen
 * @param {*} pattern
 */
export function transformEndDate(momen) {
  return transformDateTime(momen, "YYYY-MM-DD 23:59:59");
}

/**
 * 时间格式化(moment)
 * @param {*} momen
 */
export function transformTime(momen) {
  return transformDateTime(momen, "HH:mm:ss");
}

/**
 * 日期格式化(moment)
 * @param {*} momen
 */
export function transformDate(momen) {
  return transformDateTime(momen, "YYYY-MM-DD");
}

/**
 * 替换数组中的某个子项
 * @param {*} arr  数组
 * @param {*} entity  替换子项
 * @param {*} equateKey 比较的key
 */
export function spliceArray(arr, entity, equateKey = "id") {
  const { key } = entity[equateKey];
  arr.filter((item, index) => {
    if (item[equateKey] == key) {
      arr.splice(index, 1, entity);
    }
  });
  return arr;
}

/**
 * 格式化时间
 * @param {*} data
 * @param {*} pattern
 */
export function formatDateTime(data, pattern = "YYYY-MM-DD HH:mm:ss") {
  return (data && moment(data).format(pattern)) || "";
}

/**
 * 时间格式化
 * @param {*} data
 */
export function formatTime(data) {
  return formatDateTime(data, "HH:mm:ss");
}

/**
 * 日期格式化
 * @param {*} data
 */
export function formatDate(data) {
  return formatDateTime(data, "YYYY-MM-DD");
}

/**
 * 百分比格式化
 * @param {*} data
 */
export function formatPercentage(data) {
  return (data && (data * 100).toFixed(2) + "%") || "";
}

/**
 * 格式化卡号
 * @param {String} text
 */
export function formatAccountNo(text) {
  if (!text) {
    return text;
  }
  let arr = text.split("");
  // 替换次数
  let count = parseInt(arr.length / 4) - (arr.length % 4 == 0);
  for (let i = 1; i <= count; i++) {
    arr.splice(4 * i + (i - 1), 0, " ");
  }
  return arr.join("");
}

/**
 * 格式化金额
 * @param {Number} text
 */
export function formatDoubleAmount(text) {
  return formatNumber(text);
}

/**
 * 格式化金额
 * @param {Number} text
 */
export function formatIntegerAmount(text) {
  return formatNumber(text, 0);
}

/**
 * 递归查找路由页面组件
 * @param {*} arr 路由
 * @param {*} value 查找值
 * @param {*} type 查找类型，默认按路径查找
 */
export function findRoute(arr = [], value, type = "path") {
  let result = null;
  arr.forEach((item) => {
    if (item[type] === value) {
      return (result = item);
    }
    let children = item.children || [];
    if (children.length) {
      return (result = findRoute(children, value, type));
    }
  });
  return result;
}
