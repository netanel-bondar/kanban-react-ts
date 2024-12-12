import { MouseEvent, FC } from "react";
import { Grid2 as Grid, Box, Typography, ButtonBase } from "@mui/material";
import { Board } from "../typings";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface BoardsGridProps {
  boards: Board[];
  onBoardClick: (id: string) => void;
  onRemoveClick: (id: string, event: MouseEvent) => void;
}

const BoardsGrid: FC<BoardsGridProps> = ({
  boards,
  onBoardClick,
  onRemoveClick,
}) => {
  return (
    <>
      {boards.map((board) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={board.id}>
          {" "}
          <ButtonBase
            sx={{ width: "100%", height: "100%" }}
            onClick={() => onBoardClick(board.id)}
            disableRipple
          >
            <Box
              sx={{
                borderRadius: "16px",
                position: "relative",
                width: 300,
                height: 200,
                overflow: "hidden",
                background: "#D3D0CB",
              }}
            >
              {/*
              <img
                src="images/designhexagon.jpg"
                alt="Example"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
                src={board.imageUrl} 
                alt={board.title}
                */}

              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "black",
                  borderRadius: "4px",
                }}
              >
                {board.title}
              </Typography>
              <MoreVertIcon
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "black",
                }}
                onClick={(event) => onRemoveClick(board.id, event)}
              ></MoreVertIcon>
            </Box>
          </ButtonBase>
        </Grid>
      ))}
    </>
  );
};

export default BoardsGrid;
