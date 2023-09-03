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
            position: "top" as const,
            align: "end" as "end",
            labels: {
                boxWidth: 6,
                boxHeight: 6,
                usePointStyle: true,
                pointStyle: "circle",
            },
        },
        title: {
            display: false,
        },
        labels: {
            display: true,
        },
    },
};

const labels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
];

type Props = {
    background: string;
    values: number[];
};

export const ChartLineComplete = ({ background, values }: Props) => {
    const data = {
        labels,
        datasets: [
            {
                fill: false,
                label: "Receita",
                data: values,
                borderColor: background,
                backgroundColor: background,
                pointBackgroundColor: background,
                pointBorderColor: background,
            },
        ],
    };
    return (
        <Line style={{ maxHeight: "230px" }} options={options} data={data} />
    );
};
