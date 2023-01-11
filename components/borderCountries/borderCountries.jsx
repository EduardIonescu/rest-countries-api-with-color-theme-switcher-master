import BorderLink from "./borderLink";
export default function BorderCountries({ borderNames }) {
	return (
		<div
			className="flex gap-2 flex-wrap font-semibold leading-9 mt-16 
max-w-[800px]"
		>
			<p className=" font-extrabold">Border Countries:</p>{" "}
			{borderNames &&
				borderNames.map((borderName) => (
					<BorderLink key={borderName} border={borderName} />
				))}
		</div>
	);
}
