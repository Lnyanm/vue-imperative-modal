<template>
  <div id="app">
    <div>
      <button @click="toggleVisible">open modal</button>
    </div>
    <modal
      title="confirm"
      :visible="visible"
      placeholder="点击进行输入"
      @close="toggleVisible"
      @confirm="handleConfirm"
      @after-close="handleAfterClose"
    ></modal>

    <div>
      <button @click="openModal">imperative open a modal</button>
    </div>
  </div>
</template>

<script>
import Modal from './components/modal.vue';
import * as ModalUtils from './utils/modal-utils';

export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    handleConfirm(value) {
      this.visible = !this.visible;
      console.log('点击弹窗确认', value);
    },
    handleAfterClose() {
      console.log('modal is closed');
    },
    async openModal() {
      ModalUtils.open({ title: '命令式弹窗', placeholder: '请输入内容' })
        .then((value) => {
          console.log('弹窗点击确认后被关闭', value);
        })
        .catch(() => {
          console.log('弹窗被关闭');
        });
    },
  },
};
</script>

<style>
:root {
  --color--mask-background: rgba(0, 0, 0, 0.5);
  --z-index--modal: 1000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
