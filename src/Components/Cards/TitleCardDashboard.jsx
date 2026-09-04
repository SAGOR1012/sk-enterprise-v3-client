import React from 'react';
import './card.css';

import './card.css';

const TitleCardDashboard = ({
  icon: Icon,
  title,
  value,
  bColor,
  bgColor,
  bgIconColor,
  iconColor,
  countWith,
  subTitle,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-3 md:p-6 min-h-[84px] flex items-center justify-between border-t-2 ${bColor} w-full title-card`}>
      <div>
        <div className='flex gap-2 items-center'>
          <p className='text-gray-500 font-medium flex-1'>{title}</p>
          {subTitle && (
            <span className='text-xs text-gray-400 font-normal'>
              ({subTitle})
            </span>
          )}
        </div>

        <h2 className='text-2xl font-bold text-gray-700 mt-3'>
          {value}
          {countWith}
        </h2>
      </div>
      <div
        className={`rounded-md p-3 ${bgIconColor} flex items-center justify-center`}>
        <Icon
          className={`${iconColor}`}
          size={24}
        />
      </div>
    </div>
  );
};

export default TitleCardDashboard;
