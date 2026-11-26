import Image from "next/image";

export default function BrandMark() {
  return (
    <span className="brand-mark">
      <Image src="/brand/ma-stamp.svg" alt="" width={48} height={48} priority />
    </span>
  );
}
