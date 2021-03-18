<template>
  <div>
    <transition name="fade">
      <div v-if="visible" class="mask" @click="handleMaskClick"></div>
    </transition>

    <transition name="zoom" @after-leave="handleAfterClose">
      <div v-if="visible" class="wrapper">
        <div class="modal">
          <div class="title">{{ title }}</div>
          <div class="content modal-content">
            <input
              v-model="value"
              class="text-input"
              :placeholder="placeholder"
              @keydown.enter="handleConfirm"
            />
          </div>
          <div class="action-wrapper">
            <div @click="handleConfirm">confirm</div>
            <div @click="handleClose" class="cancel">cancel</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
const INITIAL_VALUE = '';

export default {
  name: 'modal',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: 'modal' },
    maskCloseable: { type: Boolean, default: false },
    placeholder: { type: String, default: 'input something ...' },
  },
  emits: ['close', 'confirm', 'after-close'],
  data() {
    return {
      value: INITIAL_VALUE,
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleMaskClick() {
      if (this.maskCloseable) {
        this.handleClose();
      }
    },
    handleAfterClose() {
      this.$emit('after-close');
      this.value = INITIAL_VALUE;
    },
    handleConfirm() {
      this.$emit('confirm', this.value);
    },
  },
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--z-index--modal);
  background-color: var(--color--mask-background);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}

@keyframes zoom-in {
  0% {
    transform: translate(-50%, -50%) scale(0.85);
  }
  70% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.zoom-enter-active {
  animation: zoom-in 300ms;
}
.zoom-leave-active {
  animation: zoom-in 300ms reverse;
}

.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: var(--z-index--modal);
  transform: translate(-50%, -50%);
  --color--divider: rgba(0, 0, 0, 0.1);
}

.modal {
  width: 320px;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.modal > .title {
  flex: none;
  padding: 4px 0;
  border-bottom: 1px solid var(--color--divider);
}

.modal > .content {
  flex: 1;
}
.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content > .text-input {
  width: 90%;
  border: none;
  border-bottom: 1px solid var(--color--divider);
  outline: none;
  transition: all 300ms;
}
.modal-content > .text-input:focus {
  border-bottom-color: hotpink;
}

.modal > .action-wrapper {
  flex: none;
  height: 30px;
  border-top: 1px solid #fff;
  display: flex;
}
.action-wrapper > * {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkseagreen;
  color: #fff;
  transition: all 300ms;
  cursor: pointer;
}
.action-wrapper > *:active {
  opacity: 0.7;
}
.action-wrapper > *:not(:last-child) {
  border-right: 1px solid #fff;
}
.action-wrapper > .cancel {
  background-color: firebrick;
}
</style>