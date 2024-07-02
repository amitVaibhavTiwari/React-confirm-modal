export type RcModalType = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmBtnTitle?: string;
  rejectBtnTitle?: string;
  setState: ({ isOpen }: { isOpen: boolean }) => void;
};
export type ModalPropsType = {
  title: string;
  description: string;
  confirmBtnTitle?: string;
  rejectBtnTitle?: string;
};
