import { useState, ChangeEvent, FC, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Box, TextField, Grid2 as Grid } from "@mui/material";
import BoardsGrid from "./BoardsGrid";
import { v4 as uuidv4 } from "uuid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Board } from "../typings";

const HomePage: FC = () => {
  const initBoardsArray = JSON.parse(localStorage.getItem("boards") || "[]");
  const [boards, setBoards] = useState<Board[]>(initBoardsArray);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const addBoard = () => {
    const newBoard = {
      id: uuidv4(),
      title: `Board ${boards.length + 1}`,
      imageUrl: "images/designhexagon.jpg",
      lists: [],
    };
    setBoards([...boards, newBoard]);
  };

  const removeBoard = (boardId: string, event: MouseEvent) => {
    event.stopPropagation();
    setBoards((boards) => boards.filter((board) => board.id !== boardId));
  };

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginTop: 4,
          marginBottom: 4,
          marginLeft: 4,
          marginRight: 4,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          startIcon={<AddBoxIcon />}
          sx={{
            backgroundColor: "#D3D0CB",
            color: "#000000",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={addBoard}
        >
          New Board
        </Button>

        <Box sx={{ width: "300px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Board"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </Box>
      </Stack>

      <Grid container spacing={4} sx={{ maxWidth: "90vw", margin: "auto" }}>
        <BoardsGrid
          boards={filteredBoards}
          onBoardClick={(id) => navigate(`/board/${id}`)}
          onRemoveClick={(boardId, event) => removeBoard(boardId, event)}
        />
      </Grid>
    </Box>
  );
};

export default HomePage;
