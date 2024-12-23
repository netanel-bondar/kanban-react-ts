import { Paper, Typography } from "@mui/material";
import { Card } from "../typings";
import { FC, memo, MouseEvent } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { useMenuContext } from "../context/MenuContext";

interface CardsProps {
  cards: Card[];
  listId: string;
  swapCards: (listId: string, oldIndex: number, newIndex: number) => void;
  removeCard: (listId: string, cardId: string) => void;
}

const Cards: FC<CardsProps> = memo(
  ({ cards, listId, swapCards, removeCard }: CardsProps) => {
    const onDragEnd = (event: any) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over.id);

      swapCards(listId, oldIndex, newIndex);
    };

    const SortableCard: FC<{ card: Card }> = ({ card }) => {
      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: card.id });

      const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      };

      return (
        <>
          <div key={card.id}>
            <Paper
              variant="elevation"
              elevation={3}
              square={false}
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              sx={{
                p: 2,
                backgroundColor: "#D3D0CB",
                marginBottom: 2,
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
                <Typography variant="body2">{card.description}</Typography>
              </div>
            </Paper>
          </div>
        </>
      );
    };

    return (
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={cards}>
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </SortableContext>
      </DndContext>
    );
  }
);
export default Cards;
