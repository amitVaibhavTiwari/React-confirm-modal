# React Confirm Modal

React Confirm Modal, a fully customizable and straightforward confirmation modal for React and TypeScript applications. No need to search for an NPM package; just copy-paste some code, and voila! You'll have a sleek confirmation modal ready to roll in your projects.

## Getting started

To kick things off, ensure you have a React application up and running locally. If not, create one🙂.

- Start by creating a folder named Confirm (or whatever name you like🙂) inside your components directory. All our code will be inside this folder.

- Inside our Confirm folder :

### types.ts

- First, let's lay down some types for our confirmation modal in a file called `types.ts`

```
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
```

### Model.tsx

- Create `Modal.tsx` for the main modal component. Here's a sneak peek into what it'll look like:

```
import "./Modal.css";
import { useEffect } from "react";
import { RcModalType } from "./types";
const RcModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmBtnTitle,
  rejectBtnTitle,
  setState,
}: RcModalType) => {
  //below useEffect is to remove the modal from page if user navigates to previous page
  useEffect(() => {
    if (isOpen === true) {
      window.onpopstate = () => {
        setState({ isOpen: false });
      };
    }
    if (isOpen === false) {
      window.onpopstate = null;
    }
  }, [isOpen, setState]);

  // below useEffect is to freeze the screen if modal is open.
  useEffect(() => {
    const body = document.documentElement;
    if (isOpen) {
      body.setAttribute(
        "style",
        "overflow-y: hidden; position: absolute; width: 100%; top: 0px;"
      );
    } else {
      body.setAttribute(
        "style",
        "overflow-y: overlay; position: initial; width: auto; top: initial;"
      );
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => onClose()}
      className={
        isOpen
          ? "rc-modal-container rc-modal-container-visible"
          : "rc-modal-container"
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          return null;
        }}
        className="rc-modal"
      >
        <h1 className="rc-modal-heading">{title}</h1>
        <p className="rc-modal-text">{description}</p>
        <div className="rc-btns-container">
          <button onClick={() => onConfirm()} className="rc-btn-confirm">
            {confirmBtnTitle ? confirmBtnTitle : "Yes"}
          </button>
          <button onClick={() => onClose()} className="rc-btn-cancel">
            {rejectBtnTitle ? rejectBtnTitle : "No"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RcModal;

```

### Modal.css

- Now, let's add some style to our modal component with `Modal.css`

```
.rc-modal-container {
  position: fixed;
  place-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #000000b0;
  display: none;
  pointer-events: none;
}
.rc-modal-container-visible {
  display: grid;
  pointer-events: all;
}

.rc-modal {
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  width: 80%;
  max-width: 360px;
}
.rc-modal-heading {
  font-weight: 800;
  font-size: 1.7rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.rc-modal-text {
  margin-top: 1rem;
  font-size: 1rem;
  font-family: sans-serif;
}
.rc-btns-container {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
.rc-btn-confirm {
  background-color: black;
  padding: 0.5rem 0.7rem;
  color: white;
  border-radius: 0.25rem;
  border: none;
}
.rc-btn-cancel {
  padding: 0.4rem 0.6rem;
  border-radius: 0.25rem;
  border: 0.1rem solid black;
}
```

### Confirm.tsx

- Now, create a file named `Confirm.tsx` and add the below code to it. This component manages the state and logic for displaying the modal:

```
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
```

Now, we need to wrap our entire application into Confirm component we are exporting from above file.<br><br>

### Wrapping Up in `main.tsx` file:

- Finally, integrate the confirmation modal into your application with main.tsx or your React root file by wrapping the entire application with confirm component:

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Confirm from "./Components/Confirm/Confirm.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Confirm>
      <App />
    </Confirm>
  </React.StrictMode>
);


```

- That's all 🙂. Now we can use confirmation modal anywhere inside our appliaction.

## Example usage

To integrate the confirmation modal into your components, follow these steps:

1. Import the `useConfirm` Hook:

Begin by importing the useConfirm hook from the Confirm.tsx file where it was defined:

```
import { useConfirm } from "./Components/Confirm/Confirm.tsx";
```

2. Implementing the Confirmation Modal:

Within your component, utilize the `useConfirm` hook to access confirmation modal functionalities:

```
 const confirm = useConfirm();
```

3. **Example Button Integration:**

Here’s an example of integrating the confirmation modal with a button click action:

```
<button onClick={() => handleClick()}>
        Delete post
      </button>
```

**handleClick Function**

```
const handleClick = async () => {
    const resp = await confirm({
      title: "Delete post ?",
      description:
        "Are you sure you want to delete this post ? This action cannot be undone.",
    });
    if (resp === true) {
      // complete your action
    }
  };
```

- The function must be asynchronous because useConfirm returns a promise.

- **resp** will be true if the user confirms the action; otherwise, it will be false.

### the confirm takes an object with following props:

- **_title_** (required) : Specifies the title displayed in the confirmation modal.
- **_description_** (required) : Provides the descriptive text shown in the modal.
- **_confirmBtnTitle_** (optional) : Sets the text displayed on the confirmation button within the modal.
- **_rejectBtnTitle_** (optional) : Specifies the text displayed on the rejection button within the modal.

## Customization of modal

The structure of the modal can be customized within the Modal.tsx file and the modal styling can be customized by editing the Modal.css file.

If you find this repository useful, please consider giving it a star!⭐
