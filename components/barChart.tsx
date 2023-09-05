import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './barChart.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: 'Number of Items per Product',
            font: {
                size: 20
              }
        },
    },
};

interface ChartDataProps {
    data:{
        labels:string[],
        datasets:{
            label:string,
            data:number[],
            backgroundColor:string,
        }[],
    }

}

export default function BarChart(chartDataProps:ChartDataProps) {
    const [chartData, setChartData] = useState(chartDataProps.data)

    return(
    <>
         {chartData?
                <Bar options={options} data={chartData} className={styles.chart} height={900}/>
            :
            <></>
            }
    </>
    );
  }