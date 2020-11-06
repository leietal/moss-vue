<template>
  <div class="container">
    <a-page-header
      class="header"
      title="图表"
      sub-title="visiter"
    />
    <a-card bordered size="small" title="本周销售图">
      <v-chart
        :force-fit="true"
        :height="400"
        :data="data"
        :scale="scale[0]"
        class="xs-chart"
      >
        <v-tooltip />
        <v-axis />
        <v-legend />
        <v-line position="time*temperature" color="xs" />
        <v-point
          position="time*temperature"
          color="xs"
          :size="4"
          :v-style="style"
          :shape="'circle'"
        />
      </v-chart>
    </a-card>
  </div>
</template>

<script>
const DataSet = require("@antv/data-set");
const scale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%",
  },
  {
    dataKey: "time",
    min: 0,
    max: 1,
  },
];

const sourceData = [];

const dv = new DataSet.View().source(sourceData);
dv.transform(
  {
    type: "fold",
    fields: ["wxh", "fl", "glj"],
    key: "xs",
    value: "temperature",
  },
  {
    type: "percent",
    fields: "wxh",
    dimension: "time",
    as: "percent",
  }
);
const data = dv.rows;

export default {
  data() {
    return {
      data,
      scale,
      style: { stroke: "#fff", lineWidth: 1 },
    };
  },
  methods: {},
};
</script>