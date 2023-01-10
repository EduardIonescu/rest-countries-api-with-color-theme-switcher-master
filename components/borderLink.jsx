import Link from "next/link";
export default function BorderLink({ border }) {
	return (
		<>
			<Link
				className="h-9 block min-w-[100px] bg-white text-[14px] font-light
      rounded-md px-3 shadow text-center"
				href={`/country/${border}`}
			>
				{border}
			</Link>
		</>
	);
}
