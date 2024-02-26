import { cn } from "@/lib/utils";
import RichText from "../text";

interface TableProps {
  block: any;
  className?: string | undefined;
}

const columnStyle = function (index: number, has_row_header: any): string {
  if (index === 0 && has_row_header) {
    return "bg-stone-100";
  }
  return "";
};

export function TableRender({ block, className }: TableProps) {
  const {
    id,
    table: { has_column_header, has_row_header },
  } = block;
  return (
    <table
      key={id}
      className={cn(className, "max-w-ful w-full border-collapse border border-solid border-inherit text-left")}
    >
      <tbody>
        {block.children?.map((child: any, index: number) => {
          const RowElement = has_column_header && index === 0 ? "th" : "td";
          const RowStyle = RowElement == "th" ? "bg-stone-100" : "";
          return (
            <tr key={child.id}>
              {child.table_row?.cells?.map((cell: { plain_text: any }, i: number) => (
                <RowElement
                  key={`${cell.plain_text}-${i}`}
                  className={cn(
                    RowStyle,
                    columnStyle(i, has_row_header),
                    "border border-solid border-inherit px-3 py-1.5"
                  )}
                >
                  <RichText title={cell} />
                </RowElement>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
