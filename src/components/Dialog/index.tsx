import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  content: ReactNode;
}
function Dialog({ children, title, description, content }: Props) {
  return (
    <DialogUI>
      {children}
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
           {description}
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </DialogUI>
  );
}

export default Dialog;
