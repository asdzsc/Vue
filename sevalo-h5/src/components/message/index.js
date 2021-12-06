import MessageToast from '@/components/message/MessageToast.vue';
import { createVNode, render } from 'vue';
let vm;
let timer;
export function messageToast({ message, duration }) {
  if (!vm) {
    vm = createVNode(MessageToast, { message: '', visible: false });
    const container = document.createElement('div');
    render(vm, container);
    document.body.appendChild(container.firstElementChild);
  }
  if (timer) clearTimeout(timer);
  vm.component.props.visible = true;
  vm.component.props.message = message;
  timer = setTimeout(() => {
    vm.component.props.visible = false;
  }, duration);
}
