import { useState, FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import { TaskList, Card } from "../typings";
import { List } from "lucide-react";
import Lists from "./Lists";

const BoardPage: FC = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const initLists = JSON.parse(localStorage.getItem(`lists${boardId}`) || "[]");

  const [lists, setLists] = useState<TaskList[]>(initLists);

  useEffect(() => {
    localStorage.setItem(`lists${boardId}`, JSON.stringify(lists));
  }, [lists]);

  const addList = () => {
    const newList = {
      id: uuidv4(),
      title: `List ${lists.length + 1}`,
      cards: [],
    };
    setLists([...lists, newList]);
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

      <Stack direction="row" spacing={3} sx={{ minWidth: "max-content" }}>
        <Lists lists={lists} removeList={removeList} addCard={addCard} />
        <Box>
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
              "&:hover": {
                backgroundColor: "#B3B0AB",
              },
            }}
            onClick={addList}
          >
            Add List
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default BoardPage;
