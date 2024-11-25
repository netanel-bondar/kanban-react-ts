import { v4 as uuidv4 } from "uuid";

interface Board {
  id: string;
  title: string;
  imageUrl: string;
}

interface BoardsProps {
  boards: Board[];
}

function BoardsHTMLGenerator({ boards }: BoardsProps) {
  return (
    <>
      {boards.map((board) => (
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

export function Boards() {
  const initBoardsArray: Board[] = Array.from({ length: 7 }, (_, index) => ({
    id: uuidv4(),
    title: `Board ${index + 1}`,
    imageUrl: "images/designhexagon.jpg",
  }));

  const [boardsArray, setBoardsArray] = useState<Board[]>(initBoardsArray);

  return (
    <div className="container">
      <button
        className="btn btn-primary ms-3 mt-3"
        onClick={() => {
          setBoardsArray([
            ...boardsArray,
            {
              id: uuidv4(),
              title: `Board ${boardsArray.length + 1}`,
              imageUrl: "images/designhexagon.jpg",
            },
          ]);
        }}
      >
        New Board
      </button>

      <div className="row">
        <BoardsHTMLGenerator boards={boardsArray} />
      </div>
    </div>
  );
}

export default Boards;
