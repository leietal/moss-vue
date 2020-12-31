<template>
  <button :class="['xs-btn', type ? `xs-btn-${type}` : '']">
    <span class="btn-content">
      <slot name="prefix" class="btn-prefix">
        <a-icon :type="prefix" v-if="prefix" />
      </slot>
      <slot name="default"></slot>
      <slot name="suffix" class="btn-suffix">
        <a-icon :type="suffix" v-if="suffix" />
      </slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default",
    },
    prefix: {
      type: String,
    },
    suffix: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.xs-btn {
  border: 1px solid #eee;
  height: 40px;
  padding: 0 18px;
  border-radius: 4px;
  margin: 0;
  color: #777;
  background-color: transparent;
  transition: 300ms;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
}
.xs-btn::before {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  height: 100px;
  width: 0;
  background-color: transparent;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 2;
}
.xs-btn:hover {
  border-color: #546de5;
  background-color: rgba(173, 187, 255, 0.3);
  color: #546de5;
}
.xs-btn:not(.xs-btn-link):hover::before {
  animation: xxx 300ms ease;
}
@keyframes xxx {
  0% {
    width: 0%;
    width: 0%;
  }
  20% {
    left: 20%;
    width: 40%;
  }
  40% {
    left: 40%;
    width: 40%;
  }
  60% {
    left: 60%;
    width: 40%;
  }
  80% {
    left: 80%;
    width: 20%;
  }
  100% {
    left: 100%;
    width: 0%;
  }
}
.btn-content {
  position: relative;
  z-index: 3;
}
/* link */
.xs-btn.xs-btn-link {
  border-color: transparent;
  background-color: transparent;
  color: #546de5;
}
.xs-btn.xs-btn-link:hover {
  color: #768dff;
}
/* danger */
.xs-btn.xs-btn-danger {
  border-color: #ff4d4f;
  background-color: #ff4d4f;
  color: #fff;
}
.xs-btn.xs-btn-danger:hover {
  border-color: #ff6b6d;
  background-color: #ff6b6d;
  color: #fff;
}
/* primary */
.xs-btn.xs-btn-primary {
  border-color: #546de5;
  background-color: #546de5;
  color: #fff;
}
.xs-btn.xs-btn-primary:hover {
  border-color: #768dff;
  background-color: #768dff;
  color: #fff;
}
</style>