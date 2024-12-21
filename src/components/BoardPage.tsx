import { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid2 as Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { v4 as uuidv4 } from "uuid";
import { TaskList, Card } from "../typings";
import Lists from "./Lists";
import { StyledTextField } from "./LoginForm";
import { arrayMove } from "@dnd-kit/sortable";

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const initLists = JSON.parse(localStorage.getItem(`lists${boardId}`) || "[]");

  const [lists, setLists] = useState<TaskList[]>(initLists);

  useEffect(() => {
    localStorage.setItem(`lists${boardId}`, JSON.stringify(lists));
  }, [lists]);

  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const addList = () => {
    if (!newTitle.trim()) {
      const newList = {
        id: uuidv4(),
        title: `List ${lists.length + 1}`,
        cards: [],
        creationDate: new Date().toISOString().split("T")[0],
        creationTime: new Date().toLocaleTimeString("en-GB", { hour12: false }),
      };
      setLists([...lists, newList]);
      setOpenModal(false);
      return;
    }
    const newList = {
      id: uuidv4(),
      title: newTitle,
      cards: [],
      creationDate: new Date().toISOString().split("T")[0],
      creationTime: new Date().toLocaleTimeString("en-GB", { hour12: false }),
    };

    setLists([...lists, newList]);
    setOpenModal(false);
    setNewTitle("");
  };

  const removeList = (listId: string) => {
    setLists((lists) => lists.filter((list) => list.id !== listId));
  };

  const swapLists = (oldIndex: number, newIndex: number) => {
    setLists((lists) => {
      return arrayMove(lists, oldIndex, newIndex);
    });
  };

  const swapCards = (listId: string, oldIndex: number, newIndex: number) => {
    const listIndex = lists.findIndex((list) => list.id === listId);
    if (listIndex === -1) return;

    let newCards = [...lists[listIndex].cards];

    newCards = arrayMove(newCards, oldIndex, newIndex);

    let newLists = [...lists];
    newLists[listIndex].cards = newCards;

    setLists(newLists);
  };

  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (
    listId: string,
    cardTitle: string,
    cardDescription: string
  ) => {
    setLists((prevTaskLists) =>
      prevTaskLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: uuidv4(),
                  title: cardTitle,
                  description: cardDescription,
                },
              ],
            }
          : list
      )
    );
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 4 }}>
        Board id: {boardId}
      </Typography>

      <Button
        variant="contained"
        size="medium"
        startIcon={<AddBoxIcon />}
        sx={{
          width: 200,
          backgroundColor: "#D3D0CB",
          color: "#000000",
          textTransform: "none",
          borderRadius: "10px",
          marginBottom: 2,
          transition: "all 0.05s linear",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: "#B3B0AB",
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        Add List
      </Button>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ textAlign: "center", mb: 1 }}>
          Create List
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            fullWidth
            label="List title"
            value={newTitle}
            variant="outlined"
            margin="normal"
            // required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              color: "black",
              "&:hover": {
                fontWeight: "bold",
              },
            }}
          >
            {" "}
            Cancel
          </Button>

          <Button
            onClick={addList}
            // disabled={!newTitle.trim()}
            sx={{
              color: "black",
              "&:hover": {
                fontWeight: "bold",
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Grid container spacing={4} sx={{ maxWidth: "90vw", margin: "auto" }}>
          <Lists
            lists={lists}
            removeList={removeList}
            swapLists={swapLists}
            addCard={addCard}
            swapCards={swapCards}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default BoardPage;
