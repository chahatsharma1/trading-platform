import React, {useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import { Button } from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getMarketChart} from "@/page/State/Coin/Action.js";

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1,
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Time Series (Weekly)",
        label: "1 Week",
        value: 7,
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Time Series (Monthly)",
        label: "1 Month",
        value: 30,
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Time Series (Yearly)",
        label: "1 Year",
        value: 365,
    },
];

const StockChart = ({coinId}) => {
    const dispatch=useDispatch();
    const {coin}=useSelector(store => store);

    const [activeLabel, setActiveLabel] = useState(timeSeries[0]);

    const series = [
        {
            data: coin.marketChart.data,
        },
    ];

    const options = {
        chart: {
            id: "area-datetime",
            zoom: {
                autoScaleYaxis: true
            },
            toolbar: {
                show: false
            },
            background: '#1E293B',
            // Ensure chart is responsive and fits container
            // ApexCharts usually handles this if height/width are not fixed pixels
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "datetime",
            // You might need to adjust tickAmount or add a datetime formatter based on the time range (activeLabel)
            tickAmount: 6, // Example, adjust as needed
            labels: {
                style: {
                    colors: '#F1F5F9'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#F1F5F9'
                }
            },
            // Add a formatter for currency if needed
            // formatter: function (value) {
            //   return value.toFixed(2); // Example formatter
            // }
        },
        colors: ["#38BDF8"],
        markers: {
            colors: ["#fff"],
            strokeColor: "#fff",
            size: 0,
            strokeWidth: 1,
            style: "hollow"
        },
        tooltip: {
            theme: "dark",
            // Add tooltip formatter if needed for price/date
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.7,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: "#334155",
            strokeDasharray: 4,
            show: true
        }
    };

    const handleActiveLabel = (value) => {
        setActiveLabel(value);
    };

    useEffect(() => {
        // Note: Your getMarketChart seems to expect value (1, 7, 30, 365), but your backend/API might need different parameters like 'day', 'week', 'month', 'year' or start/end timestamps. Verify your API requirements.
        dispatch(getMarketChart(coinId, activeLabel.value, localStorage.getItem("jwt")))
    }, [dispatch, coinId, activeLabel]); // Dependency on activeLabel ensures data refetches when time range changes

    // We also need to potentially resize the chart when the window resizes or the container changes size.
    // ApexCharts can handle this if its container resizes and height/width are set to 100% or auto.
    // Adding an effect to update options or call a resize method might be necessary depending on the library's behavior in a flex container.
    useEffect(() => {
        const handleResize = () => {
            // A simple trick is to re-render the chart by updating options or series,
            // or if apexcharts exposes a resize method, call that.
            // Re-rendering might be inefficient for just resizing.
            // ApexCharts often tries to be responsive if container size changes and height/width are not fixed.
            // Let's rely on that for now after setting height="100%".
            // If not working, you might need a ResizeObserver or window.addEventListener('resize').
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        // Add h-full here so this root div takes the full height of its parent (the flex-grow div from Home.jsx)
        <div className="bg-[#1E293B] p-6 rounded-2xl shadow-md text-[#F1F5F9] h-full flex flex-col"> {/* Added h-full and flex flex-col */}
            <div className="flex gap-3 mb-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
                {timeSeries.map((item) => (
                    <Button
                        key={item.label}
                        onClick={() => handleActiveLabel(item)}
                        className={`text-sm rounded-xl px-4 py-2 border transition-colors duration-200
        ${activeLabel.label === item.label
                            ? "bg-[#3B82F6] text-white border-transparent cursor-default hover:bg-[#3B82F6]"
                            : "bg-transparent text-[#F1F5F9] border-[#334155] hover:bg-[#334155] hover:text-white"}`}>
                        {item.label}
                    </Button>
                ))}
            </div>
            {/* This div will contain the chart and should also take available space */}
            {/* It needs height: 100% or flex-grow to allow the chart inside to fill it */}
            <div id="chart-timelines" className="flex-grow h-full"> {/* Added flex-grow and h-full */}
                <Chart
                    options={options}
                    series={series}
                    // REMOVED fixed height={400}
                    height="100%" // Set height to 100% to fill the parent div
                    type="area"
                />
            </div>
        </div>
    );
};

export default StockChart;