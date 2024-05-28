import { markRaw } from "vue";
import { defineStore } from "pinia";

export type InteractiveDialogModal = {
  iconName: string;
  heading: string;
  message: string;
  actionName: string;
  action: () => void;
  secondaryActionName?: string;
  secondaryAction?: () => void;
};

export type EditMovieModalProps = {
  movieId: string;
};

type PropTypes = InteractiveDialogModal | EditMovieModalProps;

type Modal = {
  isOpen: boolean;
  view: object;
  props?: PropTypes;
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
    async openWithProps(viewPath: string, props: PropTypes) {
      this.isOpen = true;
      this.props = props;
      const view = await import(`@/components/modals/${viewPath}.vue`);
      this.view = markRaw(view.default);
    },
    close() {
      this.isOpen = false;
      this.view = {};
    },
  },
});

export default useModal;
