// import React, { useState, useEffect } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import UseDailySell from '../../../Hooks/UseDailySell';

// const MonthlySellChart = () => {
//   const [dailySell] = UseDailySell();

//   const [chartData, setChartData] = useState({
//     series: [
//       {
//         name: 'সেল',
//         data: [],
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'bar',
//         toolbar: { show: false },
//         // background: '#f9fafb', // Light gray background
//         // background: 'transparent', // Light gray background
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 6,
//           columnWidth: '40%', // 👈 narrower bars (try 20% if you want even thinner)
//           dataLabels: {
//             position: 'top',
//           },
//         },
//       },
//       colors: [
//         '#f59e0b',
//         '#10b981',
//         '#3b82f6',
//         '#ef4444',
//         '#8b5cf6',
//         '#ec4899',
//         '#14b8a6',
//         '#f97316',
//         '#22c55e',
//         '#0ea5e9',
//         '#a855f7',
//         '#eab308',
//       ],
//       dataLabels: {
//         enabled: true,
//         formatter: function (val) {
//           return `৳ ${val}`;
//         },
//         offsetY: -20,
//         style: {
//           fontSize: '12px',
//           fontWeight: 'bold',
//           colors: ['#111827'], // dark gray for contrast
//         },
//       },
//       xaxis: {
//         categories: [],
//         position: 'bottom',
//         axisBorder: { show: false },
//         axisTicks: { show: false },
//         labels: {
//           style: {
//             colors: '#374151',
//             fontWeight: 600,
//           },
//         },
//       },
//       yaxis: {
//         labels: {
//           formatter: function (val) {
//             return `৳ ${val}`;
//           },
//           style: {
//             colors: '#374151',
//             fontWeight: 600,
//           },
//         },
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return `৳ ${val}`;
//           },
//         },
//       },
//       title: {
//         text: 'মাসিক সেল চার্ট',
//         align: 'center',
//         style: {
//           color: '#dc2626',
//           fontSize: '18px',
//           fontWeight: 'bold',
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     if (dailySell.length > 0) {
//       // মাসভিত্তিক ডাটা গ্রুপ
//       const monthlyData = dailySell.reduce((acc, curr) => {
//         const date = new Date(curr.date);
//         const month = date.toLocaleString('bn-BD', { month: 'short' });
//         if (!acc[month]) acc[month] = 0;
//         acc[month] += curr.totalSell;
//         return acc;
//       }, {});

//       const labels = Object.keys(monthlyData);
//       const data = Object.values(monthlyData);

//       setChartData((prev) => ({
//         ...prev,
//         series: [{ name: 'সেল', data }],
//         options: {
//           ...prev.options,
//           xaxis: {
//             ...prev.options.xaxis,
//             categories: labels,
//           },
//         },
//       }));
//     }
//   }, [dailySell]);

//   return (
//     <div className='py-[7px] mt-2  rounded-md  '>
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type='bar'
//         height={350}
//       />
//     </div>
//   );
// };

// export default MonthlySellChart;
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import UseDailySell from '../../../Hooks/UseDailySell';
import './MonthlySell.css';

const MonthlySellChart = () => {
  const [dailySell] = UseDailySell();

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Monthly Sales',
        data: [],
      },
    ],
    options: {
      chart: {
        height: 330,
        type: 'bar',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'Inter, sans-serif',
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '60%',
          distributed: false,
          dataLabels: {
            position: 'top',
          },
        },
      },
      colors: ['#4F46E5'], // Indigo color matching the reference
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `৳ ${val.toLocaleString('bn-BD')}`;
        },
        offsetY: -20,
        style: {
          fontSize: '11px',
          fontWeight: 500,
          colors: ['#374151'],
        },
      },
      stroke: {
        show: true,
        width: 0, // No border on bars
        colors: ['transparent'],
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: true,
          color: '#E5E7EB',
          height: 1,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          },
        },
        title: {
          text: 'Months',
          style: {
            color: '#6B7280',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return `৳ ${val.toLocaleString('bn-BD')}`;
          },
          style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          },
        },
        title: {
          text: 'Sales Amount',
          style: {
            color: '#6B7280',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        x: {
          show: true,
          formatter: function (val) {
            return `Month: ${val}`;
          },
        },
        y: {
          formatter: function (val) {
            return `৳ ${val.toLocaleString('bn-BD')}`;
          },
          title: {
            formatter: () => 'Sales',
          },
        },
      },
      title: {
        text: 'মাসিক সেল চার্ট',
        align: 'left',
        offsetX: 10,
        offsetY: 0,
        style: {
          color: '#111827',
          fontSize: '18px',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
        },
      },
      subtitle: {
        text: 'Monthly Sales Overview',
        align: 'left',
        offsetX: 10,
        offsetY: 40,
        style: {
          color: '#6B7280',
          fontSize: '14px',
          fontWeight: 400,
          fontFamily: 'Inter, sans-serif',
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -30,
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        labels: {
          colors: '#6B7280',
          useSeriesColors: false,
        },
        markers: {
          width: 12,
          height: 12,
          radius: 6,
        },
      },
      fill: {
        opacity: 1,
        type: 'solid',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.25,
          gradientToColors: ['#3730A3'], // Darker indigo
          inverseColors: false,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [0, 100],
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 280,
            },
            plotOptions: {
              bar: {
                columnWidth: '70%',
              },
            },
            dataLabels: {
              style: {
                fontSize: '10px',
              },
            },
            title: {
              style: {
                fontSize: '16px',
              },
            },
            subtitle: {
              style: {
                fontSize: '12px',
              },
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (dailySell.length > 0) {
      // মাসভিত্তিক ডাটা গ্রুপ
      const monthlyData = dailySell.reduce((acc, curr) => {
        const date = new Date(curr.date);
        // Get month name in Bangla
        const monthNames = [
          'জানুয়ারি',
          'ফেব্রুয়ারি',
          'মার্চ',
          'এপ্রিল',
          'মে',
          'জুন',
          'জুলাই',
          'আগস্ট',
          'সেপ্টেম্বর',
          'অক্টোবর',
          'নভেম্বর',
          'ডিসেম্বর',
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!acc[key]) acc[key] = 0;
        acc[key] += curr.totalSell;
        return acc;
      }, {});

      // Sort by month-year
      const sortedEntries = Object.entries(monthlyData).sort((a, b) => {
        const monthNames = [
          'জানুয়ারি',
          'ফেব্রুয়ারি',
          'মার্চ',
          'এপ্রিল',
          'মে',
          'জুন',
          'জুলাই',
          'আগস্ট',
          'সেপ্টেম্বর',
          'অক্টোবর',
          'নভেম্বর',
          'ডিসেম্বর',
        ];
        const [monthA, yearA] = a[0].split(' ');
        const [monthB, yearB] = b[0].split(' ');

        if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
        return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
      });

      const labels = sortedEntries.map(([label]) => label);
      const data = sortedEntries.map(([, value]) => value);

      // If we have multiple series, we can add them here
      const series = [
        {
          name: 'Monthly Sales',
          data: data,
        },
        // You can add a comparison series if needed
        // {
        //   name: 'Last Year',
        //   data: data.map(val => Math.round(val * 0.85)), // Example: 85% of current year
        // },
      ];

      setChartData((prev) => ({
        ...prev,
        series: series,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: labels,
          },
          // Update colors if multiple series
          colors: series.length > 1 ? ['#4F46E5', '#10B981'] : ['#4F46E5'],
        },
      }));
    }
  }, [dailySell]);

  return (
    <div className='p-6 bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-full mx-auto'>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={330}
        width='100%'
      />
    </div>
  );
};

export default MonthlySellChart;
