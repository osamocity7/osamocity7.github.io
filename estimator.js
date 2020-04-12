
const covid19ImpactEstimator = (data) => {
  // var osas="tuyuyitit"

  const output = {
    data,
    impact: {
      currentlyInfected: 0,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0,
    },
    severeImpact: {
      currentlyInfected: 0,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0,
    },
  };

  output.impact.currentlyInfected = data.reportedCases * 10;
  output.severeImpact.currentlyInfected = data.reportedCases * 50;

  if (data.periodType === 'days') {
    output.impact.infectionsByRequestedTime = ((2 ** (Math.trunc(data.timeToElapse / 3)))
    * output.impact.currentlyInfected);
    // console.log((2 ** (Math.trunc(data.timeToElapse / 3))) * output.impact.currentlyInfected);
    output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected
    * (2 ** Math.trunc(data.timeToElapse / 3));
  } else if (data.periodType === 'months') {
    output.impact.infectionsByRequestedTime = output.impact.currentlyInfected
    * (2 ** Math.trunc(data.timeToElapse * (30 / 3)));
    output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected
    * (2 ** Math.trunc(data.timeToElapse * (30 / 3)));
  } else if (data.periodType === 'weeks') {
    output.impact.infectionsByRequestedTime = output.impact.currentlyInfected
    * (2 ** Math.trunc(data.timeToElapse * (7 / 3)));
    output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected
     * (2 ** Math.trunc(data.timeToElapse * (7 / 3)));
  }

  // output.impact.infectionsByRequestedTime=output.impact.currentlyInfected

  output.impact.severeCasesByRequestedTime = Math.trunc(0.15
  * output.impact.infectionsByRequestedTime);
  output.severeImpact.severeCasesByRequestedTime = Math.trunc(0.15
  * output.severeImpact.infectionsByRequestedTime);

  output.impact.hospitalBedsByRequestedTime = Math
    .trunc((data.totalHospitalBeds * 0.35)
  - output.impact.severeCasesByRequestedTime);
  output.severeImpact.hospitalBedsByRequestedTime = Math
    .trunc((data.totalHospitalBeds * 0.35)
  - output.severeImpact.severeCasesByRequestedTime);


  // -----------------------PART 3----------------------------------------------------------------

  output.impact.casesForICUByRequestedTime = Math.trunc(output.impact
    .infectionsByRequestedTime * 0.05);
  output.severeImpact.casesForICUByRequestedTime = Math.trunc(output.severeImpact
    .infectionsByRequestedTime * 0.05);

  output.impact.casesForVentilatorsByRequestedTime = Math
    .trunc(output.impact.infectionsByRequestedTime * 0.02);
  output.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(output.severeImpact
    .infectionsByRequestedTime * 0.02);

  if (data.periodType === 'days') {
    // console.log('i entered ooo');
    // console.log(data.region.avgDailyIncomeInUSD);
    // console.log(data.timeToElapse);
    // console.log(output.impact.infectionsByRequestedTime);
    output.impact.dollarsInFlight = Math
      .trunc((data.region.avgDailyIncomeInUSD
    * data.region.avgDailyIncomePopulation * output.impact.infectionsByRequestedTime)
    / data.timeToElapse);
    output.severeImpact.dollarsInFlight = Math
      .trunc((data.region.avgDailyIncomePopulation
      * data.region.avgDailyIncomeInUSD
     * output.severeImpact.infectionsByRequestedTime) / data.timeToElapse);
  } else if (data.periodType === 'weeks') {
    output.impact.dollarsInFlight = Math
      .trunc((data.region.avgDailyIncomeInUSD
    * data.region.avgDailyIncomePopulation
      * output.impact.infectionsByRequestedTime) / (data.timeToElapse * 7));
    output.severeImpact.dollarsInFlight = Math
      .trunc((data.region.avgDailyIncomePopulation
       * data.region.avgDailyIncomeInUSD
     * output.severeImpact.infectionsByRequestedTime) / (data.timeToElapse * 7));
  } else if (data.periodType === 'months') {
    output.impact.dollarsInFlight = Math.trunc((data.region.avgDailyIncomePopulation
       * data.region.avgDailyIncomeInUSD
    * output.impact.infectionsByRequestedTime) / (data.timeToElapse * 30));
    output.severeImpact.dollarsInFlight = Math
      .trunc((data.region.avgDailyIncomePopulation
       * data.region.avgDailyIncomeInUSD
    * output.severeImpact.infectionsByRequestedTime) / (data.timeToElapse * 30));
  }


  return output;
};

export default covid19ImpactEstimator;
