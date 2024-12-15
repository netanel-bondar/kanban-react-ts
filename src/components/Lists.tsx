import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  Grid2 as Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TaskList } from "../typings";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";
import { StyledTextField } from "./LoginForm";

interface ListsProps {
  lists: TaskList[];
  removeList: (listId: string) => void;
  addCard: (listId: string, cardTitle: string, cardDescription: string) => void;
}
const Lists: FC<ListsProps> = ({ lists, removeList, addCard }) => {
  const [openModalForList, setOpenModalForList] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDesciption] = useState("");

  const handleAddCard = (
    listId: string,
    cardTitle: string,
    cardDescription: string
  ) => {
    if (!newTitle.trim() && !newDescription.trim()) {
      addCard(listId, cardTitle, cardDescription);
      setOpenModalForList(null);
      return;
    }
    addCard(listId, newTitle, newDescription);
    setOpenModalForList(null);
    setNewTitle("");
    setNewDesciption("");
  };

  return (
    <>
      {lists.map((list) => (
        <>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={list.id}>
            <Paper
              variant="elevation"
              elevation={3}
              square={false}
              sx={{
                p: 2,
                backgroundColor: "#D3D0CB",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <IconButton
                style={{ position: "absolute", right: 8, top: 8 }}
                onClick={() => removeList(list.id)}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                key={list.id}
                variant="h6"
                sx={{ textAlign: "center", marginBottom: 2 }}
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
                      marginBottom: 2,
                      transition: "all 0.05s linear",
                      "&:hover": {
                        transform: "scale(1.04)",
                        backgroundColor: "#B3B0AB",
                      },
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
                  onClick={() => setOpenModalForList(list.id)}
                >
                  Add Card
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Dialog
            open={openModalForList === list.id}
            onClose={() => setOpenModalForList(null)}
          >
            <DialogTitle sx={{ textAlign: "center", mb: 1 }}>
              New card
            </DialogTitle>
            <DialogContent>
              <StyledTextField
                fullWidth
                label="Title"
                value={newTitle}
                variant="outlined"
                margin="normal"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewTitle(e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />
              <StyledTextField
                fullWidth
                label="Description"
                value={newDescription}
                variant="outlined"
                margin="normal"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewDesciption(e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenModalForList(null)}
                sx={{ color: "black", "&:hover": { fontWeight: "bold" } }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleAddCard(list.id, "title", `New Card in ${list.title}`);
                  setOpenModalForList(null);
                }}
                sx={{ color: "black", "&:hover": { fontWeight: "bold" } }}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ))}
    </>
  );
};

export default Lists;
