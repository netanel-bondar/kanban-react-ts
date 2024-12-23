import {
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
  MouseEvent,
} from "react";

interface MenuContextType {
  menuPosition: { top: number; left: number } | null;
  setMenuPosition: (event: MouseEvent | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [menuPosition, setMenuPositionInternal] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const setMenuPosition = (event: MouseEvent | null) => {
    if (event) {
      setMenuPositionInternal({ top: event.clientY, left: event.clientX });
    } else {
      setMenuPositionInternal(null);
    }
  };

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <MenuContext.Provider
      value={{
        menuPosition,
        setMenuPosition,
        selectedNodeId,
        setSelectedNodeId,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};
