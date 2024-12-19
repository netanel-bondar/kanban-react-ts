import { MouseEvent, FC, useState, useRef } from "react";
import {
  Grid2 as Grid,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Board } from "../typings";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
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
  const [selectedBoardId, setSelectedBoardId] = useState<null | string>(null);

  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const initialRectRef = useRef<DOMRect | null>(null);
  const finalRectRef = useRef<DOMRect | null>(null);

  const handleContextMenu = (
    event: MouseEvent<HTMLElement>,
    boardId: string
  ) => {
    event.preventDefault();
    setSelectedBoardId(boardId);
    setMenuPosition({ top: event.clientY, left: event.clientX });
  };

  const handleClose = () => setMenuPosition(null);

  const onDragStart = (event: any) => {
    const { active } = event;

    const element = document.getElementById(active.id);

    if (element) {
      initialRectRef.current = element.getBoundingClientRect();
    }
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
      <>
        <Box
          id={board.id}
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onContextMenu={(event) => handleContextMenu(event, board.id)}
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
        </Box>

        <Menu
          id={`board-menu-${board.id}`}
          anchorReference="anchorPosition"
          anchorPosition={
            menuPosition
              ? { top: menuPosition.top, left: menuPosition.left }
              : undefined
          }
          open={Boolean(menuPosition) && board.id === selectedBoardId}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <ListItemIcon>
              <StarBorderOutlinedIcon />
            </ListItemIcon>{" "}
            Star
          </MenuItem>
          <MenuItem
            onClick={() => {
              onRemoveClick(board.id);
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteOutlinedIcon />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={boards}>
        {boards.map((board) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={board.id}>
            <SortableBoard key={board.id} board={board} />
          </Grid>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default BoardsGrid;
