import { textOverflowEllipsis } from "@/styles/common";

export default function DescItem({ name, value }: { name: string; value: string; }) {
  return (
    <h2
      className="font-semibold text-xs md:text-sm lg:text-base"
      style={textOverflowEllipsis.singleLine}
    >
      {name}: <span className="font-normal">{value}</span>
    </h2>
  );
}