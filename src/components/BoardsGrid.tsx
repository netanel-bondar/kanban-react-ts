import { MouseEvent, FC, useState, useEffect, act, useRef } from "react";
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
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BoardsGridProps {
  boards: Board[];
  onBoardClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
  swapBoards: (oldIndex: number, newIndex: number) => void;
}

const BoardsGrid: FC<BoardsGridProps> = ({
  boards,
  onBoardClick,
  onRemoveClick,
  swapBoards,
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

  const initialRectRef = useRef<DOMRect | null>(null);
  const finalRectRef = useRef<DOMRect | null>(null);

  const onDragStart = (event: any) => {
    const { active } = event;

    console.log(event);

    const element = document.getElementById(active.id);

    if (element) {
      initialRectRef.current = element.getBoundingClientRect();
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent drag start
  };

  const onDragEnd = (event: any) => {
    let { active, over } = event;

    if (!over || active.id === over.id) {
      const element = document.getElementById(active.id);

      if (element) {
        finalRectRef.current = element.getBoundingClientRect();
      }

      if (
        initialRectRef?.current?.top === finalRectRef?.current?.top &&
        initialRectRef?.current?.left === finalRectRef?.current?.left
      ) {
        onBoardClick(active.id);
      }

      return;
    }

    const oldIndex = boards.findIndex((board) => board.id === active.id);
    const newIndex = boards.findIndex((board) => board.id === over.id);

    swapBoards(oldIndex, newIndex);
  };

  const SortableBoard: FC<{ board: Board }> = ({ board }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: board.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <Box
        id={board.id}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          borderRadius: "16px",
          position: "relative",
          width: "auto",
          height: 200,
          overflow: "hidden",
          background: "#D3D0CB",
          cursor: "pointer",
        }}
      >
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
          onClick={(event) => {
            event.stopPropagation();
            handleClick(event, board.id);
            console.log("clicked");
          }}
          onMouseDown={handleMouseDown}
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
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={boards} strategy={verticalListSortingStrategy}>
        {boards.map((board) => (
          // <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={board.id}>
          <SortableBoard key={board.id} board={board} />
          // {/* </ButtonBase> */}
          // </Grid>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default BoardsGrid;
