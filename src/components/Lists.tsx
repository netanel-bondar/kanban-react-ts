import { useState, ChangeEvent } from "react";
import {
  Button,
  Paper,
  Typography,
  Grid2 as Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { TaskList } from "../typings";

import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FC } from "react";
import { StyledTextField } from "./LoginForm";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Cards from "./Cards";
// import { menuPosition, changeMenuPosition } from "../Global";

interface ListsProps {
  lists: TaskList[];
  removeList: (listId: string) => void;
  swapLists: (oldIndex: number, newIndex: number) => void;
  addCard: (listId: string, cardTitle: string, cardDescription: string) => void;
  swapCards: (listId: string, oldIndex: number, newIndex: number) => void;
}
const Lists: FC<ListsProps> = ({
  lists,
  removeList,
  swapLists,
  addCard,
  swapCards,
}) => {
  const [openModalForList, setOpenModalForList] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [selectedListId, setSelectedListId] = useState<null | string>(null);

  const [menuListPosition, setMenuListPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleAddCard = (
    listId: string,
    cardTitle: string,
    cardDescription: string
  ) => {
    if (!newTitle.trim() && !newDescription.trim()) {
      addCard(listId, cardTitle, cardDescription);
      setOpenModalForList(null);
      return;
    }
    addCard(listId, newTitle, newDescription);
    setOpenModalForList(null);
    setNewTitle("");
    setNewDescription("");
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = lists.findIndex((board) => board.id === active.id);
    const newIndex = lists.findIndex((board) => board.id === over.id);

    swapLists(oldIndex, newIndex);
  };

  const handleClose = () => {
    setSelectedListId(null);
    setMenuListPosition(null);
  };

  const handleContextMenu = (event: any, listId: string) => {
    event.preventDefault();

    setSelectedListId(listId);
    setMenuListPosition({ top: event.clientY, left: event.clientX });
  };

  const SortableList: FC<{ list: TaskList }> = ({ list }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: list.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    return (
      <>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={list.id}>
          <Paper
            id={list.id}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onContextMenu={(event) => handleContextMenu(event, list.id)}
            variant="elevation"
            elevation={3}
            square={false}
            sx={{
              p: 2,
              backgroundColor: "#D3D0CB",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Typography
              key={list.id}
              variant="h6"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              {list.title}
            </Typography>

            <Cards cards={list.cards} listId={list.id} swapCards={swapCards} />
          </Paper>
        </Grid>

        <Menu
          id={`list-menu-${list.id}`}
          anchorReference="anchorPosition"
          anchorPosition={
            menuListPosition
              ? { top: menuListPosition.top, left: menuListPosition.left }
              : undefined
          }
          open={Boolean(menuListPosition) && list.id === selectedListId}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              setOpenModalForList(list.id);
              handleClose();
            }}
          >
            <ListItemIcon>
              <AddOutlinedIcon />
            </ListItemIcon>
            Add Card
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <ListItemIcon>
              <StarBorderOutlinedIcon />
            </ListItemIcon>{" "}
            Star
          </MenuItem>
          <MenuItem
            onClick={() => {
              removeList(list.id);
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteOutlinedIcon />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>

        <Dialog
          open={openModalForList === list.id}
          onClose={() => setOpenModalForList(null)}
        >
          <DialogTitle sx={{ textAlign: "center", mb: 1 }}>
            New card
          </DialogTitle>
          <DialogContent>
            <StyledTextField
              fullWidth
              label="Title"
              value={newTitle}
              variant="outlined"
              margin="normal"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTitle(e.target.value)
              }
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
              fullWidth
              label="Description"
              value={newDescription}
              variant="outlined"
              margin="normal"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewDescription(e.target.value)
              }
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenModalForList(null)}
              sx={{ color: "black", "&:hover": { fontWeight: "bold" } }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleAddCard(list.id, "title", `New Card in ${list.title}`);
                setOpenModalForList(null);
              }}
              sx={{ color: "black", "&:hover": { fontWeight: "bold" } }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={lists}>
        {lists.map((list) => (
          <SortableList key={list.id} list={list} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Lists;
