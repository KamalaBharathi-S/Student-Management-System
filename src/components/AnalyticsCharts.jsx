import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useStudents } from '../hooks/useStudents';
import styles from './AnalyticsCharts.module.css';

Chart.register(...registerables);

const AnalyticsCharts = () => {
  const { students, departments, theme } = useStudents();
  
  const deptChartRef = useRef(null);
  const yearChartRef = useRef(null);
  const deptChartInstance = useRef(null);
  const yearChartInstance = useRef(null);

  useEffect(() => {
    // 1. Department Chart (Doughnut)
    if (deptChartRef.current) {
      if (deptChartInstance.current) {
        deptChartInstance.current.destroy();
      }

      const deptData = departments.map(dept => 
        students.filter(s => s.department === dept).length
      );

      deptChartInstance.current = new Chart(deptChartRef.current, {
        type: 'doughnut',
        data: {
          labels: departments,
          datasets: [{
            data: deptData,
            backgroundColor: [
              '#6366f1', // Indigo
              '#10b981', // Emerald
              '#f59e0b', // Amber
              '#0ea5e9', // Sky Blue
              '#ec4899'  // Pink
            ],
            borderColor: theme === 'dark' ? '#0f1524' : '#ffffff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: theme === 'dark' ? '#cbd5e1' : '#334155',
                font: {
                  family: 'Outfit',
                  size: 11,
                  weight: 'bold'
                },
                padding: 15
              }
            }
          }
        }
      });
    }

    // 2. Year Chart (Bar)
    if (yearChartRef.current) {
      if (yearChartInstance.current) {
        yearChartInstance.current.destroy();
      }

      const yearData = ['1', '2', '3', '4'].map(yr => 
        students.filter(s => String(s.year) === yr).length
      );

      yearChartInstance.current = new Chart(yearChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
          datasets: [{
            label: 'Students Count',
            data: yearData,
            backgroundColor: 'rgba(99, 102, 241, 0.85)',
            hoverBackgroundColor: '#6366f1',
            borderRadius: 6,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: theme === 'dark' ? '#94a3b8' : '#475569',
                font: {
                  family: 'Outfit'
                }
              }
            },
            y: {
              grid: {
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                stepSize: 1,
                color: theme === 'dark' ? '#94a3b8' : '#475569',
                font: {
                  family: 'Outfit'
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (deptChartInstance.current) {
        deptChartInstance.current.destroy();
      }
      if (yearChartInstance.current) {
        yearChartInstance.current.destroy();
      }
    };
  }, [students, theme, departments]);

  return (
    <div className={styles.chartsGrid}>
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Students by Department</h3>
        <p className={styles.chartSubtitle}>Academic split across all faculties</p>
        <div className={styles.chartCanvasContainer}>
          <canvas ref={deptChartRef}></canvas>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Students by Year</h3>
        <p className={styles.chartSubtitle}>Enrolment counts by class year</p>
        <div className={styles.chartCanvasContainer}>
          <canvas ref={yearChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
