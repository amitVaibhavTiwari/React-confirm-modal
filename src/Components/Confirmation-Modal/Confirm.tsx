import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import RcModal from "./Modal";
import { ModalPropsType } from "./types";

type contextType = (data: ModalPropsType) => Promise<boolean>;
const confirmationContext = createContext<contextType>({} as contextType);

const Confirm = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({ isOpen: false });
  const fn = useRef<null | ((choice: boolean) => void)>(null);
  const confirm: contextType = useCallback(
    (data: ModalPropsType) => {
      return new Promise((resolve) => {
        setState({ ...data, isOpen: true });
        fn.current = (choice) => {
          resolve(choice);
          setState({ isOpen: false });
        };
      });
    },
    [setState]
  );
  return (
    <confirmationContext.Provider value={confirm}>
      {children}
      <RcModal
        {...state}
        setState={setState}
        onClose={() => {
          if (fn.current) fn.current(false);
        }}
        onConfirm={() => {
          if (fn.current) fn.current(true);
        }}
      />
    </confirmationContext.Provider>
  );
};

// Exporting a custom hook to use confirmation modal.
export const useConfirm = () => useContext(confirmationContext);

export default Confirm;
