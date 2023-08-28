import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
);

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        labels: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            display: false,
            grid: {
                display: false,
            },
        },
    },
};

const labels = ["S", "T", "Q", "Q", "S", "S", "D"];

type Props = {
    background: string;
    dataChart: number[];
    label: string;
};

export const ChartLineSimple = ({ background, dataChart, label }: Props) => {
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: label,
                data: dataChart,
                borderColor: background,
                backgroundColor: background,
                pointBackgroundColor: "rgba(75,192,192,0.0)",
                pointBorderColor: "rgba(75,192,192,0.0)",
            },
        ],
    };
    return <Line style={{ maxWidth: 200 }} options={options} data={data} />;
};
