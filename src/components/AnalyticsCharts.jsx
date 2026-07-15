import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useStudents } from '../hooks/useStudents';
import { useAcademy } from '../context/AcademyContext';
import styles from './AnalyticsCharts.module.css';

Chart.register(...registerables);

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Tamil', 'Social Studies'];

const AnalyticsCharts = () => {
  const { students, theme } = useStudents();
  const { studentPerformance } = useAcademy();

  const marksChartRef   = useRef(null);
  const genderChartRef  = useRef(null);
  const marksChartInst  = useRef(null);
  const genderChartInst = useRef(null);

  const textColor  = theme === 'dark' ? '#94a3b8' : '#475569';
  const gridColor  = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
  const borderBg   = theme === 'dark' ? '#111827' : '#ffffff';

  useEffect(() => {
    // ── Chart 1: Unit Test 1 marks across subjects (Bar) ────────
    if (marksChartRef.current) {
      marksChartInst.current?.destroy();

      const marks  = studentPerformance?.marks || [];
      const ut1    = SUBJECTS.map(s => marks.find(m => m.subject === s)?.ut1   ?? 0);
      const half   = SUBJECTS.map(s => marks.find(m => m.subject === s)?.halfYearly ?? 0);

      marksChartInst.current = new Chart(marksChartRef.current, {
        type: 'bar',
        data: {
          labels: SUBJECTS.map(s => s.split(' ')[0]),
          datasets: [
            {
              label: 'Unit Test 1',
              data: ut1,
              backgroundColor: 'rgba(99,102,241,0.85)',
              borderRadius: 6,
              borderWidth: 0,
            },
            {
              label: 'Half Yearly',
              data: half,
              backgroundColor: 'rgba(16,185,129,0.75)',
              borderRadius: 6,
              borderWidth: 0,
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: textColor,
                font: { family: 'Inter', size: 11 },
                usePointStyle: true,
                pointStyleWidth: 8,
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}/100`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: gridColor },
              ticks: {
                stepSize: 20,
                color: textColor,
                font: { family: 'Inter', size: 11 },
                callback: v => `${v}`
              }
            }
          }
        }
      });
    }

    // ── Chart 2: Gender split (Doughnut) ─────────────────────────
    if (genderChartRef.current) {
      genderChartInst.current?.destroy();

      const boys  = students.filter(s => s.gender === 'Male').length;
      const girls = students.filter(s => s.gender === 'Female').length;

      genderChartInst.current = new Chart(genderChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Boys', 'Girls'],
          datasets: [{
            data: [boys, girls],
            backgroundColor: ['#6366f1', '#ec4899'],
            borderColor: borderBg,
            borderWidth: 3,
            hoverOffset: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: textColor,
                font: { family: 'Inter', size: 12, weight: '600' },
                padding: 16,
                usePointStyle: true,
                pointStyleWidth: 10,
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.parsed} student${ctx.parsed !== 1 ? 's' : ''}`
              }
            }
          }
        }
      });
    }

    return () => {
      marksChartInst.current?.destroy();
      genderChartInst.current?.destroy();
    };
  }, [students, theme, studentPerformance]);

  return (
    <div className={styles.chartsGrid}>
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Subject-wise Marks – Class 8A</h3>
        <p className={styles.chartSubtitle}>Comparison: Unit Test 1 vs Half Yearly</p>
        <div className={styles.chartCanvasContainer}>
          <canvas ref={marksChartRef}></canvas>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Class Gender Split</h3>
        <p className={styles.chartSubtitle}>Boys vs Girls in Class 8-A</p>
        <div className={styles.chartCanvasContainer}>
          <canvas ref={genderChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
