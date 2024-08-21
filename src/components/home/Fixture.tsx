import React, { useEffect, useState } from "react";

import { Loader } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helper/Fetcher";
import { renderMatchStatus } from "@/helper/fixtureStatus";

interface Matches {
  fixture: {
    id: number;
    date: Date;
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  league: {
    id: number;
    name: string;
    flag: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: true;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: false;
    };
  };
  goals: {
    home: number;
    away: number;
  };
}

const Fixture = () => {
  const [matches, setMatches] = useState<{ [key: string]: Matches[] } | null>(
    {}
  );
  const path = "/fixtures";

  // const data = FixtureData;
  const { data, error, isLoading } = useQuery({
    queryKey: ["matches", path],
    queryFn: () => fetcher(path),
    enabled: !!matches,
  });

  useEffect(() => {
    const sortData = (fixtureData : any) => {
      if (error) {
        console.error("fixtureData is null or undefined");
        return;
      }
      const sortedData: { [key: string]: Matches[] } = {};
      fixtureData.forEach((match: Matches) => {
        const leagueName = match.league.name;
        sortedData[leagueName] === undefined
          ? (sortedData[leagueName] = [match])
          : sortedData[leagueName].push(match);
      });
      // Object.entries(sortedData).map(([key, values]) => {
      //   values.map((value) => {
      //     console.log(value);
      //   });
      // });

      setMatches({ ...sortedData });
    };
    if (data) {
      sortData(data.response);
    }
  }, [data]);

  return (
    <div className="w-[70%] mx-auto">
      <div className="bg-primary-foreground p-2 rounded-md mb-6">
        <h1 className="text-2xl font-bold text-center">Fixtures</h1>
      </div>
      <div>
        {isLoading ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Loader size={50} className="animate-spin" />
            <p className="">...Loading</p>
          </div>
        ) : (
          Object.entries(matches).map(([leagueName, leagueMatches]) => (
            <div key={leagueName} className="flex flex-col mb-8">
              <div className="p-2 bg-[#1E1F1F] rounded-t-lg">{leagueName}</div>
              {leagueMatches.map((match) => (
                <div key={match.fixture.id} className="text-sm w-full">
                  <div className="bg-primary p-2">
                    <div className="grid grid-cols-11">
                      <div className="col-span-5 w-full ">
                        <div className="flex items-center justify-between">
                            <span>{renderMatchStatus(match.fixture.status, match.fixture.date)}</span>
                          <div className="flex items-center justify-center gap-4">
                            <span className="ml-2">{match.teams.home.name}</span>
                            <Image
                              src={match.teams.home.logo}
                              alt={match.teams.home.name}
                              width={30}
                              height={30}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center items-center">
                        <span className="text-center">
                          {match.goals.home} - {match.goals.away}
                        </span>
                      </div>
                      <div className="col-span-5 flex items-center">
                        <div className="flex items-center gap-4">
                          <Image
                            src={match.teams.away.logo}
                            alt={match.teams.away.name}
                            width={30}
                            height={30}
                          />
                          <span className="ml-2">{match.teams.away.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Fixture;
