import clsx from "clsx";

interface CirclesProps {
  count: number;
  current: number;
  filled: number;
  onChangeStep: (step: number) => void;
}

export const CirclesReference = ({
  count,
  filled,
  current,
  onChangeStep: setStep,
}: CirclesProps) => {
  return (
    <div className="mx-auto flex gap-x-2 p-2 transition-all">
      {Array.from({ length: count }, (_, index) => (
        <button
          type="button"
          key={index}
          disabled={current === index || index > filled}
          onClick={() => setStep(index)}
          className={clsx(
            "inline-block h-3 w-3 rounded-full transition-all",
            index <= filled
              ? "bg-gradient-to-br from-primary to-primary-200 hover:enabled:from-primary-300 hover:enabled:to-primary-100"
              : "bg-gray-400",
            current === index &&
              "bg-gradient-to-br from-secondary to-secondary-200 hover:enabled:from-secondary-300 hover:enabled:to-secondary-200"
          )}
        />
      ))}
    </div>
  );
};
