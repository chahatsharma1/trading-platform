import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMarketChart } from "@/page/State/Coin/Action.js";
import { Skeleton } from "@/components/ui/skeleton";

const timeSeries = [
    { label: "1D", value: 1 },
    { label: "1W", value: 7 },
    { label: "1M", value: 30 },
    { label: "1Y", value: 365 },
];

const StockChart = ({ coinId }) => {
    const dispatch = useDispatch();
    const { marketChart, loading } = useSelector(store => store.coin);
    const [activeTimespan, setActiveTimespan] = useState(timeSeries[0]);

    useEffect(() => {
        dispatch(getMarketChart(coinId, activeTimespan.value, localStorage.getItem("jwt")));
    }, [dispatch, coinId, activeTimespan]);

    const series = [{
        name: coinId,
        data: marketChart.data,
    }];

    const options = {
        chart: {
            id: "stock-chart",
            type: "area",
            height: "100%",
            toolbar: { show: false },
            zoom: { enabled: false },
            background: 'transparent',
        },
        dataLabels: { enabled: false },
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: "hsl(var(--muted-foreground))",
                    fontSize: '12px',
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "hsl(var(--muted-foreground))",
                    fontSize: '12px',
                },
                formatter: (val) => `₹${val.toLocaleString()}`,
            },
        },
        colors: ["hsl(var(--primary))"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 100]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        grid: {
            show: true,
            borderColor: "hsl(var(--border))",
            strokeDasharray: 3,
        },
        tooltip: {
            theme: "dark",
            x: { format: 'dd MMM yyyy, hh:mm TT' },
        },
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex justify-end gap-1 mb-4">
                {timeSeries.map((item) => (
                    <Button
                        key={item.label}
                        onClick={() => setActiveTimespan(item)}
                        variant={activeTimespan.label === item.label ? "default" : "outline"}
                        size="sm"
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div className="flex-grow h-full w-full">
                {loading || !marketChart.data ? (
                    <Skeleton className="h-full w-full" />
                ) : (
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        height="100%"
                        width="100%"
                    />
                )}
            </div>
        </div>
    );
};

export default StockChart;