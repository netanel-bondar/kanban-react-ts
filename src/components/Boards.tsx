import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";

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

  const handleClick = () => {
    alert("Card clicked!");
  };

  return (
    <>
      {/* begin boad with MUI*/}

      <ButtonBase
        onClick={handleClick}
        style={{ display: "block", textAlign: "inherit" }}
      >
        <Card
          style={{
            width: 150,
            height: 150,
            margin: "20px auto", // מיקום בקונטיינר ההורה
            borderRadius: "16px", // פינות מעוגלות
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5", // צבע רקע של הכרטיסיה
            cursor: "pointer",
          }}
        >
          {/* CardContent for the content inside */}
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: "center", color: "#3f51b5" }}
            >
              Example Board
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>

      {/* end boad with MUI*/}

      {filteredBoards.map((board) => (
        <div className="col-xs-12 col-sm-6 col-md-4 col-xl-2" key={board.id}>
          <div
            className="card bg-dark text-white"
            style={{
              maxWidth: "250px",
              height: "150px",
              margin: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <img
              className="card-img"
              src={board.imageUrl}
              alt="Card image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="card-img-overlay">
              <h5 className="card-title">{board.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

interface NewBoardButtonProps {
  newBoardFunc: () => void;
}

function NewBoardButton({ newBoardFunc }: NewBoardButtonProps) {
  return (
    <button className="btn btn-primary ms-3" onClick={newBoardFunc}>
      New Board
    </button>
  );
}

interface SearchboxProps {
  searchBoardValue: string;
  searchBoardFunc: (value: string) => void;
}

function Searchbox({ searchBoardValue, searchBoardFunc }: SearchboxProps) {
  return (
    <input
      className="form-control w-25 ms-auto me-3"
      type="text"
      placeholder="Search Board"
      value={searchBoardValue}
      onChange={(e) => searchBoardFunc(e.target.value)}
    />
  );
}

export function Boards() {
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

  const searchBoardFunc = (value: string) => {
    setSearchBoard(value);
  };

  return (
    <div className="container">
      <div className="d-flex">
        <NewBoardButton newBoardFunc={newBoardFunc} />

        <Searchbox
          searchBoardValue={searchBoard}
          searchBoardFunc={searchBoardFunc}
        />
      </div>

      <div className="row">
        <BoardsHTMLGenerator boards={boardsArray} searchBoard={searchBoard} />
      </div>
    </div>
  );
}

export default Boards;
