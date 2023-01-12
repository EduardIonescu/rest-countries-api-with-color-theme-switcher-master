import BorderLink from "./borderLink";
export default function BorderCountries({ borderNames }) {
	if (borderNames)
		return (
			<div
				className="flex gap-2 flex-wrap font-semibold leading-9 mt-8 md:mt-16 
max-w-[800px] sm:justify-center md:justify-start"
			>
				<p className="max-md:w-full mb-1 font-extrabold">
					Border Countries:
				</p>{" "}
				{borderNames &&
					borderNames.map((borderName) => (
						<BorderLink key={borderName} border={borderName} />
					))}
			</div>
		);
	else {
		return (
			<div className="flex gap-2 font-semibold  mt-8 md:mt-16 md:pt-1">
				<p className="font-extrabold ">Border Countries:</p>
				<p className="text-[14px] md:text-base ">None</p>
			</div>
		);
	}
}
