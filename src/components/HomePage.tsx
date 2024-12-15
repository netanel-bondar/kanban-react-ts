import { useState, ChangeEvent, FC, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Box,
  TextField,
  Grid2 as Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import BoardsGrid from "./BoardsGrid";
import { v4 as uuidv4 } from "uuid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Board } from "../typings";
import { StyledTextField } from "./LoginForm";

const HomePage: FC = () => {
  const initBoardsArray = JSON.parse(localStorage.getItem("boards") || "[]");
  const [boards, setBoards] = useState<Board[]>(initBoardsArray);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const AddBoard = () => {
    if (!newTitle.trim()) {
      setBoards([...boards, { id: uuidv4(), title: `Board ${boards.length}` }]);
      setOpenModal(false);
      return;
    }
    const newBoard = {
      id: uuidv4(),
      title: newTitle,
      lists: [],
    };
    setBoards([...boards, newBoard]);
    setOpenModal(false);
    setNewTitle("");
  };

  const removeBoard = (boardId: string) => {
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
            transition: "all 0.05s linear",
            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: "#B3B0AB",
            },
          }}
          onClick={() => setOpenModal(true)}
        >
          New board
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
          onBoardClick={(id) => navigate(`/app/board/${id}`)}
          onRemoveClick={(boardId) => removeBoard(boardId)}
        />
      </Grid>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ textAlign: "center", mb: 1 }}>
          Create board
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            fullWidth
            label="Board title"
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
            onClick={AddBoard}
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
    </Box>
  );
};

export default HomePage;
