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
    const {marketChart}=useSelector(store => store.coin);

    const [activeLabel, setActiveLabel] = useState(timeSeries[0]);

    const series = [
        {
            data: marketChart.data,
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
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
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
                },
                formatter: (val) => val.toFixed(2)
            },
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
        dispatch(getMarketChart(coinId, activeLabel.value, localStorage.getItem("jwt")))
    }, [dispatch, coinId, activeLabel]);
    useEffect(() => {
        const handleResize = () => {
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="bg-[#1E293B] p-6 rounded-2xl shadow-md text-[#F1F5F9] h-full flex flex-col">
            <div className="flex gap-3 mb-4 flex-shrink-0">
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
            <div id="chart-timelines" className="flex-grow h-full">
                <Chart
                    options={options}
                    series={series}
                    height="100%"
                    type="area"
                />
            </div>
        </div>
    );
};

export default StockChart;