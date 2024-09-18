import { User } from "@/services/server/auth/type";
import { AvatarFallback, AvatarImage, Avatar as AvatarS } from "../ui/avatar";
import Link from "next/link";

interface Props {
  user: User;
}
export default function Avatar({ user }: Props) {
  return (
    <div className="flex gap-3">
      <Link href={`/${user.usr_slug}`}>
          <AvatarS>
            <AvatarImage
              src={
                user.usr_avatar != ""
                  ? user.usr_avatar
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </AvatarS>
      </Link>
      <Link href={`/${user.usr_slug}`}><p>{user.usr_name}</p></Link>
    </div>
  );
}
