import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Typography,
  ButtonBase,
  Box,
  Grid2 as Grid,
  Button,
  Stack,
  TextField,
} from "@mui/material";

interface Board {
  id: string;
  title: string;
  imageUrl: string;
}

interface BoardsProps {
  boards: Board[];
  searchBoard: string;
}

function BoardsHTMLGenerator({ boards, searchBoard }: BoardsProps) {
  const filteredBoards = boards.filter((board) => {
    return board.title.toLowerCase().includes(searchBoard.toLowerCase());
  });

  return (
    <>
      {filteredBoards.map((board) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <ButtonBase
            sx={{ width: "100%", height: "100%" }}
            id={board.id}
            onClick={() => alert(`${board.title} was pressed`)}
            disableRipple
          >
            <Box
              sx={{
                borderRadius: "16px",
                position: "relative",
                width: 300,
                height: 200,
                overflow: "hidden",
              }}
            >
              <img
                src="images/designhexagon.jpg"
                alt="Example"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                {board.title}
              </Typography>
            </Box>
          </ButtonBase>
        </Grid>
      ))}
    </>
  );
}

interface NewBoardButtonProps {
  newBoardFunc: () => void;
}

function NewBoardButton({ newBoardFunc }: NewBoardButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={newBoardFunc}
      sx={{
        textTransform: "none",
        borderRadius: "10px",
        backgroundColor: "#C6CCB2",
        color: "#000000",
        width: "120px",
        height: "30px",
        fontSize: "1rem",
        fontWeight: "bold",
      }}
    >
      New Board
    </Button>
  );
}

interface SearchboxProps {
  searchBoardValue: string;
  searchBoardFunc: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Searchbox({ searchBoardValue, searchBoardFunc }: SearchboxProps) {
  return (
    <Box sx={{ width: "300px", margin: "0 auto" }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Board"
        value={searchBoardValue}
        onChange={searchBoardFunc}
      />
    </Box>
  );
}

export function HomePage() {
  const initBoardsArray: Board[] = Array.from({ length: 7 }, (_, index) => ({
    id: uuidv4(),
    title: `Board ${index + 1}`,
    imageUrl: "images/designhexagon.jpg",
  }));

  const [boardsArray, setBoardsArray] = useState<Board[]>(initBoardsArray);

  const newBoardFunc = () => {
    setBoardsArray([
      ...boardsArray,
      {
        id: uuidv4(),
        title: `Board ${boardsArray.length + 1}`,
        imageUrl: "images/designhexagon.jpg",
      },
    ]);
  };

  const [searchBoard, setSearchBoard] = useState<string>("");

  const searchBoardFunc = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchBoard(event.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginBottom: 4,
          marginLeft: 4,
          marginRight: 4,
          justifyContent: "space-between",
        }}
      >
        <NewBoardButton newBoardFunc={newBoardFunc} />

        <Searchbox
          searchBoardValue={searchBoard}
          searchBoardFunc={searchBoardFunc}
        />
      </Stack>

      <Grid container spacing={4} sx={{ marginLeft: 4, marginRight: 4 }}>
        <BoardsHTMLGenerator boards={boardsArray} searchBoard={searchBoard} />
      </Grid>
    </>
  );
}

export default HomePage;
