import React, { useState } from 'react';
import Chart from "react-apexcharts";
import { Button } from "@/components/ui/button.jsx";

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
];

const StockChart = () => {
    const [activeLabel, setActiveLabel] = useState("1 Day");

    const series = [
        {
            data: [
                [1741471789671, 7513351.47],
                [1741475398589, 7517268.65],
                [1741478692375, 7506597.79],
                [1741482498782, 7536903.78],
                [1741485933990, 7513095.33],
                [1741489725440, 7491487.78],
                [1741493372795, 7498974.24],
                [1741496690869, 7498337.46],
                [1741500290680, 7494897.32],
                [1741504133886, 7487947.77],
                [1741507499072, 7492837.93],
                [1741510928911, 7477323.62],
                [1741514674285, 7456509.43],
                [1741518291262, 7399903.45],
                [1741521801493, 7410886.61],
                [1741525789477, 7380319.62],
                [1741529378579, 7262327.01],
                [1741532993965, 7283455.94],
                [1741536147130, 7237994.23],
                [1741539887921, 7194766.31],
                [1741543772873, 7197214.07],
                [1741547228861, 7187205.79],
                [1741550688983, 7203310.04],
                [1741554289758, 7237263.29],
                [1741557717639, 7133664.15],
                [1741561764782, 6986096.36],
                [1741565156716, 7028970.20],
                [1741568692018, 7062865.00],
                [1741572498322, 7088275.98],
                [1741575870203, 7165088.39],
                [1741579783365, 7177947.43],
                [1741582871568, 7201950.92],
                [1741586594886, 7177234.54],
                [1741590277855, 7183427.77],
                [1741593896102, 7185398.77],
                [1741597361882, 7101116.23],
                [1741601384132, 7202117.56],
                [1741604986110, 7199540.44],
                [1741608363868, 7304108.65],
            ],
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
            background: '#1E293B'
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
                }
            }
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
            theme: "dark"
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

    return (
        <div className="bg-[#1E293B] p-6 rounded-2xl shadow-md text-[#F1F5F9]">
            <div className="flex gap-3 mb-4">
                {timeSeries.map((item) => (
                    <Button
                        key={item.label}
                        onClick={() => handleActiveLabel(item.label)}
                        className={`text-sm rounded-xl px-4 py-2 border transition-colors duration-200
        ${activeLabel === item.label
                            ? "bg-[#3B82F6] text-white border-transparent cursor-default hover:bg-[#3B82F6]"
                            : "bg-transparent text-[#F1F5F9] border-[#334155] hover:bg-[#334155] hover:text-white"}`}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div id="chart-timelines">
                <Chart
                    options={options}
                    series={series}
                    height={400}
                    type="area"
                />
            </div>
        </div>
    );
};

export default StockChart;
