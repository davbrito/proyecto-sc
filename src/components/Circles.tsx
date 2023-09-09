interface CirclesProps {
  count: number;
  current: number;
  filled: number;
  setStep: React.Dispatch<
    React.SetStateAction<{
      currentPos: number;
      filled: number;
    }>
  >;
}

export const CirclesReference = ({
  count,
  filled,
  current,
  setStep,
}: CirclesProps) => {
  const renderCircles = () => {
    const circles: Array<JSX.Element> = [];

    for (let i = 0; i < count; i++) {
      circles.push(
        <span
          key={`circle-reference-${i}`}
          onClick={() =>
            i <= filled
              ? setStep(({ filled }) => ({ currentPos: i, filled }))
              : null
          }
          className={`inline-block h-6 w-6 rounded-full transition-all ${
            i <= filled ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400"
          }
            ${current === i ? "bg-violet-500 hover:bg-violet-700" : ""}  
            `}
        ></span>
      );
    }
    return circles;
  };

  return (
    <div className="mx-auto flex gap-x-2 p-2 transition-all">
      {renderCircles()}
    </div>
  );
};
