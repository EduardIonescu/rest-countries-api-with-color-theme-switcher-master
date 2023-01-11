import Link from "next/link";
export default function BorderLink({ border }) {
	return (
		<>
			<Link
				className="h-8 md:h-9 block min-w-[100px] bg-white dark:bg-darkBlue
		dark:text-veryLightGray text-[12px] md:text-[14px] font-light
      rounded-md px-3 shadow text-center capitalize transition duration-300 
			ease-out md:hover:-translate-y-1 md:hover:text-blueHover
			md:dark:hover:text-[rgb(120,120,250)]"
				href={`/country/${border}`}
			>
				{border}
			</Link>
		</>
	);
}
