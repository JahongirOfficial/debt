import React from 'react';

// Custom SVG Line Chart Component
export function DebtTrendChart({ data, t }) {
  // Handle empty or insufficient data
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white/20 rounded-xl">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500">{t('dashboard.noData', 'Grafik uchun yetarli ma\'lumot yo\'q')}</p>
        </div>
      </div>
    );
  }

  // Chart dimensions
  const width = 600;
  const height = 200;
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Get min and max values for scaling
  const allValues = data.flatMap(d => [d.pending, d.paid, d.total]);
  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(...allValues, 0);

  // Create scales
  const xScale = (index) => {
    if (data.length <= 1) return innerWidth / 2;
    return (index / (data.length - 1)) * innerWidth;
  };

  const yScale = (value) => {
    if (maxValue === minValue) return innerHeight / 2;
    return innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
  };

  // Format currency for display
  const formatCurrencyShort = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' });
  };

  // Generate path data for lines
  const generatePath = (data, key) => {
    if (data.length === 0) return '';
    
    // Filter out any data points with invalid values
    const validData = data.filter(d => 
      d[key] !== null && 
      d[key] !== undefined && 
      !isNaN(d[key])
    );
    
    if (validData.length === 0) return '';
    
    const points = validData.map((d, i) => {
      const x = xScale(data.indexOf(d)); // Use original index for proper positioning
      const y = yScale(d[key]);
      return `${x},${y}`;
    });
    
    return `M${points.join(' L')}`;
  };

  // Generate circles for data points
  const generateCircles = (data, key, color) => {
    return data.map((d, i) => {
      // Skip invalid data points
      if (d[key] === null || d[key] === undefined || isNaN(d[key])) {
        return null;
      }
      
      const cx = xScale(i);
      const cy = yScale(d[key]);
      return (
        <circle
          key={`${key}-${i}`}
          cx={cx}
          cy={cy}
          r="4"
          fill={color}
          stroke="white"
          strokeWidth="2"
        />
      );
    }).filter(Boolean); // Remove null values
  };

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = ratio * innerHeight;
            const value = minValue + (maxValue - minValue) * (1 - ratio);
            return (
              <g key={i}>
                <line
                  x1="0"
                  y1={y}
                  x2={innerWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeDasharray="4"
                />
                <text
                  x="-10"
                  y={y + 4}
                  textAnchor="end"
                  fill="#6b7280"
                  fontSize="10"
                >
                  {formatCurrencyShort(value)}
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = xScale(i);
            // Show every nth label to avoid crowding
            const showLabel = data.length <= 7 || i % Math.ceil(data.length / 7) === 0;
            return showLabel ? (
              <text
                key={i}
                x={x}
                y={innerHeight + 20}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="10"
              >
                {formatDate(d.date)}
              </text>
            ) : null;
          })}
          
          {/* Pending line */}
          <path
            d={generatePath(data, 'pending')}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
          />
          {generateCircles(data, 'pending', '#f97316')}
          
          {/* Paid line */}
          <path
            d={generatePath(data, 'paid')}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          {generateCircles(data, 'paid', '#10b981')}
          
          {/* Total line */}
          <path
            d={generatePath(data, 'total')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          {generateCircles(data, 'total', '#3b82f6')}
        </g>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs text-gray-600">{t('dashboard.pending', 'Kutilayotgan')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-600">{t('dashboard.paid', 'To\'langan')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-600">{t('dashboard.totalAmount', 'Jami')}</span>
        </div>
      </div>
    </div>
  );
}