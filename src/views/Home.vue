<template>
  <div>
    <div class="xs-welcome">
      <h1 class="xs-welcome-item">:）欢迎您使用CMS管理后台.</h1>
      <div class="card-list">
        <div class="card-item">
          <span class="item-text">消息通知</span>
          <span class="item-number">18</span>
        </div>
        <div class="card-item">
          <span class="item-text">审批待办</span>
          <span class="item-number">66</span>
        </div>
      </div>

      <div class="btn-group">
        <XsButton type="default">default</XsButton>
        <XsButton type="primary">primary</XsButton>
        <XsButton type="danger">danger</XsButton>
        <XsButton type="link">link</XsButton>

        <XsButton type="primary">
          prefix
          <a-icon type="edit" slot="prefix" />
        </XsButton>

        <XsButton type="primary">
          suffix
          <a-icon type="edit" slot="suffix" />
        </XsButton>

        <XsButton type="primary">
          prefix and suffix
          <a-icon type="edit" slot="prefix" />
          <a-icon type="edit" slot="suffix" />
        </XsButton>
      </div>
    </div>
  </div>
</template>

<script>
import XsButton from "@/views/platform/button/XsButton";
export default {
  components: { XsButton },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.xs-welcome {
  display: grid;
  gap: 20px;
  align-items: center;
  justify-items: center;
  height: 300px;
}
.xs-welcome-item {
  color: #606977;
  letter-spacing: 1px;
}
.card-list {
  display: flex;
}
.card-item {
  flex: none;
  padding: 30px 60px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  transition: 300ms;
}
.card-item:hover {
  border-color: #546de5;
  box-shadow: 0 0 4px 2px rgba(84, 108, 229, 0.33);
  transform: translateY(-10px);
}
.item-text {
  font-size: 28px;
  color: #585858;
}
.item-number {
  font-size: 44px;
  font-family: Antonio;
  color: #e74c3c;
}
.card-item:nth-child(2) .item-number {
  font-family: Antonio;
}
.card-item:nth-child(1) .item-number {
  font-family: Antonio;
}
.btn-group {
  padding: 20px;
}
.btn-group .xs-btn:not(:last-child) {
  margin-right: 10px;
}
</style>
