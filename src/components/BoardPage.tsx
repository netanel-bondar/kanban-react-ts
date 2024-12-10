import React, { useState } from "react";
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

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [lists, setLists] = useState<TaskList[]>([
    { id: uuidv4(), title: "List 1", cards: [] },
    { id: uuidv4(), title: "List 2", cards: [] },
  ]);

  const addList = () => {
    const newList = {
      id: uuidv4(),
      title: `List ${lists.length + 1}`,
      cards: [],
    };
    setLists([...lists, newList]);
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
        Board id: {id}
      </Typography>

      <Stack direction="row" spacing={3} sx={{ minWidth: "max-content" }}>
        {lists.map((list) => (
          <div key={list.id}>
            <Paper
              variant="elevation"
              elevation={3}
              square={false}
              sx={{
                p: 2,
                backgroundColor: "#D3D0CB",
                width: 200,
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <IconButton
                style={{ position: "absolute", right: 8, top: 8 }}
                onClick={() => {}}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                key={list.id}
                variant="h6"
                sx={{ textAlign: "center" }}
              >
                {list.title}
              </Typography>

              {list.cards.map((card) => (
                <div key={card.id}>
                  <Paper
                    variant="elevation"
                    elevation={3}
                    square={false}
                    sx={{
                      p: 2,
                      backgroundColor: "#D3D0CB",
                      width: 170,
                      height: 70,
                      marginTop: 1,
                    }}
                  >
                    <div>
                      <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2">
                        {card.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              ))}

              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
              >
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{
                    width: 150,
                    color: "#000000",
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#B3B0AB",
                    },
                  }}
                  onClick={() =>
                    addCard(list.id, "title", `New Card in ${list.title}`)
                  }
                >
                  Add Card
                </Button>
              </Box>
            </Paper>
          </div>
        ))}
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
