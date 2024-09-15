import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
interface Props{
  children:ReactNode;
  title:string;
  content:ReactNode;
  textCannel?:string;
  textOk?:string;
  onOK:()=>void;
}
export default function Modal({children,title,content,onOK , textCannel='Cancel',textOk='Continue'}:Props) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
             {content}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{textCannel}</AlertDialogCancel>
            <AlertDialogAction onClick={()=>onOK()}>{textOk}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
