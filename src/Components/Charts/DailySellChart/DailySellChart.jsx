// import React, { useState, useEffect } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import UseDailySell from '../../../Hooks/UseDailySell';

// const DailySellChart = () => {
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
//         height: 330, // ✅ চার্টের উচ্চতা ছোট করা হয়েছে (আগে 350)
//         type: 'line',
//         toolbar: { show: false },
//         // width কমানো হলে চার্ট responsive হবে, width auto adjust হবে parent div অনুযায়ী
//       },
//       stroke: {
//         curve: 'smooth',
//         width: 3, // ✅ লাইন ঘনত্ব পরিবর্তন করতে এখানে পরিবর্তন করুন
//       },
//       markers: {
//         size: 4, // ✅ মার্কারের সাইজ ছোট করা হয়েছে
//         colors: ['#fff'], // ✅ মার্কারের ভিতরের রঙ পরিবর্তন করতে এখানে
//         strokeColors: '#3b82f6', // ✅ মার্কারের আউটার বর্ডার কালার
//         strokeWidth: 2,
//       },
//       colors: ['#3b82f6'], // ✅ লাইন কালার পরিবর্তন করতে এখানে
//       dataLabels: {
//         enabled: true,
//         formatter: function (val) {
//           return `৳ ${val}`;
//         },
//         offsetY: -10,
//         style: {
//           fontSize: '10px', // ✅ ডাটা লেবেল ফন্ট সাইজ কমানো
//           fontWeight: 'bold',
//           colors: ['#111827'], // ✅ ডাটা লেবেলের রঙ পরিবর্তন
//         },
//       },
//       xaxis: {
//         categories: [],
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
//         text: 'দৈনিক সেল চার্ট',
//         align: 'center',
//         style: {
//           color: '#0f828c', // ✅ টাইটেল রঙ পরিবর্তন
//           fontSize: '16px', // ✅ টাইটেল সাইজ ছোট করা
//           fontWeight: 'bold',
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     if (dailySell.length > 0) {
//       const today = new Date();
//       const currentMonth = today.getMonth();
//       const currentYear = today.getFullYear();

//       const currentMonthData = dailySell.filter((d) => {
//         const date = new Date(d.date);
//         return (
//           date.getMonth() === currentMonth && date.getFullYear() === currentYear
//         );
//       });

//       if (currentMonthData.length === 0) {
//         setChartData((prev) => ({
//           ...prev,
//           series: [{ name: 'সেল', data: [] }],
//           options: {
//             ...prev.options,
//             xaxis: { ...prev.options.xaxis, categories: [] },
//           },
//         }));
//         return;
//       }

//       const dailyData = currentMonthData.reduce((acc, curr) => {
//         const date = new Date(curr.date);
//         const day = date.getDate();
//         if (!acc[day]) acc[day] = 0;
//         acc[day] += curr.totalSell;
//         return acc;
//       }, {});

//       const sortedDays = Object.keys(dailyData).sort((a, b) => a - b);
//       const labels = sortedDays.map((d) => `${d} তারিখ`);
//       const data = sortedDays.map((d) => dailyData[d]);

//       setChartData((prev) => ({
//         ...prev,
//         series: [{ name: 'সেল', data }],
//         options: {
//           ...prev.options,
//           xaxis: { ...prev.options.xaxis, categories: labels },
//         },
//       }));
//     }
//   }, [dailySell]);

//   return (
//     <div className='p-4   rounded-md w-full max-w-full mx-auto  '>
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type='line'
//         height={330} // ✅ চার্টের হাইট এখানে override করা হলো
//         width='100%' // ✅ responsive width, parent div অনুযায়ী adjust হবে
//       />
//     </div>
//   );
// };

// export default DailySellChart;
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import UseDailySell from '../../../Hooks/UseDailySell';
import './Dailysell.css';

const DailySellChart = () => {
  const [dailySell] = UseDailySell();

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'সেল',
        data: [],
      },
    ],
    options: {
      chart: {
        height: 330,
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: 'smooth',
        width: 4,
        colors: ['#4F46E5'], // Indigo color for main line
      },
      markers: {
        size: 6,
        colors: ['#FFFFFF'],
        strokeColors: ['#4F46E5'],
        strokeWidth: 3,
        hover: {
          size: 8,
        },
      },
      colors: ['#4F46E5', '#10B981'], // Indigo for line, Emerald for second line if needed
      dataLabels: {
        enabled: false, // Disabled to match reference image
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
        position: 'back',
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
          width: '100%',
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
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return `৳ ${val}`;
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
            return `Date: ${val}`;
          },
        },
        y: {
          formatter: function (val) {
            return `৳ ${val}`;
          },
          title: {
            formatter: () => 'Sales',
          },
        },
        marker: {
          show: true,
        },
      },
      title: {
        text: 'দৈনিক সেল চার্ট',
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
        text: 'Daily Sales Trend',
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
          offsetX: 0,
          offsetY: 0,
        },
        itemMargin: {
          horizontal: 20,
          vertical: 0,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          gradientToColors: ['#4F46E5'],
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            borderColor: '#E5E7EB',
            strokeDashArray: 0,
            borderWidth: 1,
          },
        ],
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 280,
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
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      const currentMonthData = dailySell.filter((d) => {
        const date = new Date(d.date);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      });

      if (currentMonthData.length === 0) {
        setChartData((prev) => ({
          ...prev,
          series: [{ name: 'সেল', data: [] }],
          options: {
            ...prev.options,
            xaxis: { ...prev.options.xaxis, categories: [] },
          },
        }));
        return;
      }

      const dailyData = currentMonthData.reduce((acc, curr) => {
        const date = new Date(curr.date);
        const day = date.getDate();
        if (!acc[day]) acc[day] = 0;
        acc[day] += curr.totalSell;
        return acc;
      }, {});

      const sortedDays = Object.keys(dailyData).sort((a, b) => a - b);
      const labels = sortedDays.map((d) => `${d} তারিখ`);
      const data = sortedDays.map((d) => dailyData[d]);

      // If we have multiple series, we can add them here
      const series = [
        {
          name: 'Weekly',
          data: data,
        },
        // You can add a monthly series if needed
        // {
        //   name: 'Monthly',
        //   data: data.map(val => val * 0.8), // Example transformation
        // },
      ];

      setChartData((prev) => ({
        ...prev,
        series: series,
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories: labels },
        },
      }));
    }
  }, [dailySell]);

  return (
    <div className='p-6 bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-full mx-auto'>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type='line'
        height={330}
        width='100%'
      />
    </div>
  );
};

export default DailySellChart;
