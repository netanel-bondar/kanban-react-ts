import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { TaskList } from "../typings";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";

interface ListsProps {
  lists: TaskList[];
  removeList: (listId: string) => void;
  addCard: (listId: string, cardTitle: string, cardDescription: string) => void;
}
const Lists: FC<ListsProps> = ({ lists, removeList, addCard }) => {
  return (
    <>
      {lists.map((list) => (
        <div key={list.id}>
          <Paper
            variant="elevation"
            elevation={3}
            square={false}
            sx={{
              p: 2,
              backgroundColor: "#D3D0CB",
              width: 200,
              height: 400,
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

            <Typography key={list.id} variant="h6" sx={{ textAlign: "center" }}>
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
                    width: 170,
                    height: 70,
                    marginTop: 1,
                  }}
                >
                  <div>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2">{card.description}</Typography>
                  </div>
                </Paper>
              </div>
            ))}

            <Box sx={{ display: "flex", justifyContent: "center", mt: "auto" }}>
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
                onClick={() =>
                  addCard(list.id, "title", `New Card in ${list.title}`)
                }
              >
                Add Card
              </Button>
            </Box>
          </Paper>
        </div>
      ))}
    </>
  );
};

export default Lists;
