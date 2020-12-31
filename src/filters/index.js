import {
  formatDateTime,
  formatDate,
  formatTime,
  formatPercentage,
  formatAccountNo,
  formatDoubleAmount,
  formatIntegerAmount,
} from "@/utils";

export default {
  formatDateTime,
  formatDT: (data) => (fmt) => formatDateTime(data, fmt),
  formatTime,
  formatDate,
  formatPercentage,
  formatAccountNo,
  formatDoubleAmount,
  formatIntegerAmount,
};
