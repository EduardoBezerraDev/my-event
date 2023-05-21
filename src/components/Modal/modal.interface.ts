interface ConfigModal {
    open: boolean;
        title: string;
        message: string;
        variant: string;
}

interface ModalCustomProps {
    configModal: ConfigModal;
    onClose: ()=>void;
  }

  export type {ConfigModal, ModalCustomProps} 