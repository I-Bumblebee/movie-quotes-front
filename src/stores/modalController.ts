import { markRaw } from "vue";
import { defineStore } from "pinia";

export type ActionPropTypes = {
  iconName: string;
  heading: string;
  message: string;
  actionName: string;
  action: () => void;
  secondaryActionName?: string;
  secondaryAction?: () => void;
};

type Modal = {
  isOpen: boolean;
  view: object;
  props?: ActionPropTypes;
};

export const useModal = defineStore("modal", {
  state: (): Modal => ({
    isOpen: false,
    view: {},
  }),
  actions: {
    async open(viewPath: string) {
      this.isOpen = true;
      const view = await import(`@/components/modals/${viewPath}.vue`);
      this.view = markRaw(view.default);
    },
    async openActionModal(viewPath: string, props: ActionPropTypes) {
      this.isOpen = true;
      this.props = props;
      const view = await import(`@/components/base/${viewPath}.vue`);
      this.view = markRaw(view.default);
    },
    close() {
      this.isOpen = false;
      this.view = {};
    },
  },
});

export default useModal;
