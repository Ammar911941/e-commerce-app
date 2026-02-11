import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default async function Title({ name }: { name: string }) {
  const categoriesName = ["a"];
  return (
    <div className="title mb-5 ">
      <h1 className="text-2xl font-medium mb-5">{name}</h1>
      <div className="category">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold rounded-full shadow px-6 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all">
              Select a Category
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white rounded-xl shadow-lg border border-orange-100 mt-2 min-w-45 p-1">
            <DropdownMenuGroup>
              {categoriesName.map((e, index) => (
                <Link href={`/shop/${e}`} key={index}>
                  <DropdownMenuItem className="rounded-lg px-3 py-2 hover:bg-orange-50 focus:bg-orange-100 text-gray-800 transition-colors cursor-pointer">
                    {e}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
