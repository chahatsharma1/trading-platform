import React, {useState} from 'react';
import Chart from "react-apexcharts";
import {Button} from "@/components/ui/button.jsx";

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
    const [activeLabel, setActiveLabel] = useState("1 Day")
    const series = [
        {data: [[1741471789671, 7513351.47476157],
            [1741475398589, 7517268.65192409],
        [1741478692375, 7506597.7997841],
        [1741482498782, 7536903.78512812],
        [1741485933990, 7513095.33823441],
        [1741489725440, 7491487.78988696],
        [1741493372795, 7498974.2495913],
        [1741496690869, 7498337.46747421],
        [1741500290680, 7494897.32096361],
        [1741504133886, 7487947.77214351],
        [1741507499072, 7492837.93048309],
        [1741510928911, 7477323.62042042],
        [1741514674285, 7456509.43470195],
        [1741518291262, 7399903.45877816],
        [1741521801493, 7410886.61796704],
        [1741525789477, 7380319.62391456],
        [1741529378579, 7262327.01262466],
        [1741532993965, 7283455.94023642],
        [1741536147130, 7237994.23873835],
        [1741539887921, 7194766.31172463],
        [1741543772873, 7197214.07856855],
        [1741547228861, 7187205.79855227],
        [1741550688983, 7203310.0474565],
        [1741554289758, 7237263.29835432],
        [1741557717639, 7133664.15390627],
        [1741561764782, 6986096.36646753],
        [1741565156716, 7028970.20417905],
        [1741568692018, 7062865.00712338],
        [1741572498322, 7088275.98931355],
        [1741575870203, 7165088.39497959],
        [1741579783365, 7177947.43029134],
        [1741582871568, 7201950.92659638],
        [1741586594886, 7177234.5492439],
        [1741590277855, 7183427.77091955],
        [1741593896102, 7185398.77211902],
        [1741597361882, 7101116.23545636],
        [1741601384132, 7202117.56702117],
        [1741604986110, 7199540.44716806],
        [1741608363868, 7304108.65456093]]
    }]

    const options = {
        chart: {
            id:"area-datetime",
            zoom:{
                autoScaleYaxis:true
            }
        },
        dataLabels:{
            enabled:false
        },
        xaxis: {
            type:"datetime",
            tickAmount:6
        },
        colors:["#758AA2"],
        markers:{
            colors:["#fff"],
            strokeColor:"#fff",
            size:0,
            strokeWidth:1,
            style:"hollow"
        },
        tooltip:{
            theme:"dark"
        },
        fill:{
            type:"gradient",
            gradient:{
                shadeIntensity:1,
                opacityFrom:0.7,
                opacityTo:0.9,
                stops:[0.100]
            }
        },
        grid:{
            borderColor:"#47535E",
            strokeDasharray:4,
            show:true
        }
    };

    const handleActiveLabel=(value)=>{
        setActiveLabel(value);
    }
    return (
        <div>
            <div className="space-x-3">
                {timeSeries.map((item) =>
                    <Button variant={activeLabel === item.label ? "" :"outline"}
                                                  onClick= {() => handleActiveLabel(item.label)}
                                                  key={item.label}>
                    {item.label}
                </Button>)}
            </div>
            <div id="chart-timlines">
                <Chart options = {options}
                       series={series}
                       height={450}
                       type="area"
                />
            </div>
        </div>
    );
};

export default StockChart;