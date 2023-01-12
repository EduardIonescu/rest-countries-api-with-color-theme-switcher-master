import Link from "next/link";
import Image from "next/image";

export default function BackButton() {
	return (
		<Link
			href="/"
			className="group flex gap-2 md:gap-4 items-center bg-white 
  dark:bg-darkBlue w-28 md:w-40 h-9 md:h-12 justify-center
rounded-md shadow-md font-semibold transition-all duration-300 ease-linear
xl:hover:shadow-xl text-sm md:text-base"
		>
			<Image
				className="rotate-180 transition-all duration-300 ease-out
  md:group-hover:-translate-x-2 dark:invert md:w-[18px]"
				src="/icons/arrow-icon.svg"
				alt=""
				aria-hidden="true"
				width={14}
				height={10}
			/>
			Back
		</Link>
	);
}
