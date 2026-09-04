import React from 'react';
import UseInvestment from '../../Hooks/UseInvestment';

const InvestmentProgress = () => {
  const [investments, isLoading] = UseInvestment();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  // Aggregate investments per investor
  const investorMap = {};
  investments.forEach((inv) => {
    if (investorMap[inv.name]) {
      investorMap[inv.name] += inv.amount;
    } else {
      investorMap[inv.name] = inv.amount;
    }
  });

  const aggregatedInvestors = Object.entries(investorMap).map(
    ([name, amount], idx) => ({
      name,
      amount,
      color: `hsl(${(idx * 100) % 360}, 70%, 50%)`, // dynamic color per investor
    })
  );

  const totalInvestment = aggregatedInvestors.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );

  return (
    <div className='p-4 bg-white rounded-lg shadow-md w-80 mx-auto text-center border'>
      <h2 className='text-md text-[#0F828C] font-bold mb-4'>
        ইনভেস্টমেন্ট প্রোগ্রেস
      </h2>

      <div className='mb-4'>
        <span className='text-xs text-gray-500 ml-1'>টোটাল : </span>
        <span className='text-xl text-[#0F828C]  font-bold '>
          {totalInvestment} <span className='text-xs'> BDT</span>
        </span>
      </div>

      <div className='space-y-3'>
        {aggregatedInvestors.map((inv) => {
          const percentage = ((inv.amount / totalInvestment) * 100).toFixed(1);
          return (
            <div key={inv.name}>
              <div className='flex justify-between mb-1 text-sm font-medium'>
                <span>{inv.name}</span>
                <span>{percentage}%</span>
              </div>
              <div className='w-full bg-gray-200 h-4 rounded-full'>
                <div
                  className='h-4 rounded-full'
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: inv.color,
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestmentProgress;
