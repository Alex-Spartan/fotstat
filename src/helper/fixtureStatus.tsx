export const renderMatchStatus = (status: {
  long: string;
  short: string;
  elapsed: number;
}, date: Date) => {
  const time = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (status.long === "Match Finished") {
    return (
      <h2 className="text-xs text-center font-bold p-2 rounded-full bg-[#1E1F1F]">
        {status.short}
      </h2>
    );
  } else if (
    status.long === "Not Started") {
      return (
        <div>
        <h2 className="text-sm text-center font-bold p-2">
          {time}
        </h2>
      </div>
      )
    } else if (
    status.long === "Match Postponed" ||
    status.short === "TBD"
  ) {
    return (
      <div>
        <h2 className="text-xs text-center font-bold rounded-full bg-[#1E1F1F] p-2">
          {status.short}
        </h2>
      </div>
    );
  } else {
    return (
      <h2 className="text-sm text-center font-bold rounded-full bg-[#1E1F1F] p-2">
        {status.elapsed}&apos;
      </h2>
    );
  }
};
