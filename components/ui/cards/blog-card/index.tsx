import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: string;
  title: string;
  date?: string;
  readTime?: string;
  href: string;
  excerpt?: string;
}

export default function BlogCard({
  image,
  title,
  date,
  readTime,
  href,
  excerpt,
}: BlogCardProps) {
  return (
    <div className="bg-[#EAF3FB] rounded-2xl p-3 w-full max-w-[320px]">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      {/* Content */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-[#1A274F] text-[17px] font-semibold leading-snug">
          {title}
        </h3>
        <p className="text-[#4B6CB7] text-[13px] leading-relaxed flex-1">
          {excerpt}
        </p>
        {/* Meta */}
        <div className="flex items-center gap-2 text-[13px] text-[#4B6CB7]">
          <span>{date}</span>
          <span className="w-[5px] h-[5px] rounded-full bg-[#1A274F] inline-block" />
          <span>{readTime}</span>
        </div>

        {/* CTA */}
        <div className="mt-1">
          <Link
            href={href}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0066FF] text-white text-[14px] font-medium hover:bg-[#25429A] transition-colors"
          >
            Read Now
          </Link>
        </div>
      </div>
    </div>
  );
}
