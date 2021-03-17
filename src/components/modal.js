import Vue from 'vue';
import Modal from './modal.vue';

const ModalConstructor = Vue.extend(Modal);

export default function open(options = {}, parent) {
  return new Promise((resolve, reject) => {
    options.visible = false;

    // create an instance
    const instance = new ModalConstructor({ propsData: options });

    // render and mount to dom
    const vm = instance.$mount();
    // 如果有传入parent参数，那么把当前弹窗挂载到parent下，否则挂载到body下
    if (parent) {
      parent.appendChild(vm.$el);
    } else {
      document.body.appendChild(vm.$el);
    }

    // in this context, variable "instance" is always equals to "vm"

    const close = () => {
      vm.visible = false;
      reject('关闭弹窗');
    };
    const confirm = value => {
      vm.visible = false;
      resolve(value);
    };
    const afterClose = () => {
      // destory vue instance and remove dom element
      vm.$destroy();
      if (vm.$el.parentNode) {
        vm.$el.parentNode.removeChild(vm.$el);
      }
    };

    // bind events
    vm.$on('close', close);
    vm.$on('confirm', confirm);
    vm.$on('after-close', afterClose);

    // manual update data at next tick
    vm.$nextTick(() => {
      vm.visible = true;
    });
  });
}
