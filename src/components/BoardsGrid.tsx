import { MouseEvent, FC, useState } from "react";
import {
  Grid2 as Grid,
  Box,
  Typography,
  ButtonBase,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Board } from "../typings";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface BoardsGridProps {
  boards: Board[];
  onBoardClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
}

const BoardsGrid: FC<BoardsGridProps> = ({
  boards,
  onBoardClick,
  onRemoveClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<null | string>(null);

  const handleClick = (event: MouseEvent<HTMLElement>, boardId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedBoardId(boardId);
  };
  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
    setSelectedBoardId(null);
  };

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
              <IconButton
                id={`board-menu-${board.id}`}
                onClick={(event) => handleClick(event, board.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "black",
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`board-menu-${board.id}`}
                anchorEl={anchorEl}
                open={selectedBoardId === board.id}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(event) => {
                    onRemoveClick(board.id);
                    handleClose(event);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </ButtonBase>
        </Grid>
      ))}
    </>
  );
};

export default BoardsGrid;
