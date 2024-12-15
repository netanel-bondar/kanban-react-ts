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
import Masonry from "@mui/lab/Masonry";

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
    console.log(newList.creationDate);
    console.log(newList.creationTime);
    setLists([...lists, newList]);
    setOpenModal(false);
    setNewTitle("");
  };

  const removeList = (listId: string) => {
    setLists((lists) => lists.filter((list) => list.id !== listId));
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
                  id: Date.now().toString(),
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
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          <Lists lists={lists} removeList={removeList} addCard={addCard} />
        </Masonry>
      </Box>
    </Box>
  );
};

export default BoardPage;
