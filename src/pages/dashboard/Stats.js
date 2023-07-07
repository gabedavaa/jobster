import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartsContainer from "../../components/ChartsContainer";
import StatsContainer from "../../components/StatsContainer";
import { showStats } from "../../features/allJobs/allJobsSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
