import {
  Drawer as DrawerUI,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import { useImmer } from "use-immer";
import { Button } from "../ui/button";
interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  content: ReactNode;
}
function Drawer({ children, title, description, content }: Props) {
  const [open, setOpen] = useImmer(false);
  return (
    <DrawerUI open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerUI>
  );
}

export default Drawer;
