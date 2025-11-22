import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  children: React.ReactNode;
}

export const KanbanColumn = ({ id, title, count, children }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 pb-2 border-b">
        <h2 className="font-semibold text-lg">
          {title} <span className="text-muted-foreground">({count})</span>
        </h2>
      </div>
      
      <div 
        ref={setNodeRef}
        className="flex-1 min-h-[200px]"
      >
        {children}
      </div>
    </div>
  );
};
