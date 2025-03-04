import Heading from '../components/heading';
import styles from '../styles/analytics.module.css';
import { useEffect, useState } from 'react';
import { getAnalyticsData } from '../services';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [linkCount, setLinkCount] = useState(0);
  const [shopCount, setShopCount] = useState(0);
  const [ctaCount, setCtaCount] = useState(0);
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
    getAnalytics();
  }, [linkCount, shopCount, ctaCount]);

  const getAnalytics = async () => {
    try {
      const response = await getAnalyticsData();
      if (response.ok) {
        const data = await response.json();
        const analytics = data.analytics;

        // Filtering & counting occurrences based on action type
        const linkClicks = analytics.filter(item => item.clickType === 'link').length;
        const shopClicks = analytics.filter(item => item.clickType === 'shop').length;
        const ctaClicks = analytics.filter(item => item.clickType === 'CTA').length;

        setLinkCount(linkClicks);
        setShopCount(shopClicks);
        setCtaCount(ctaClicks);

        const siteClicks = {};
        const monthlyData = {};
        const defaultDevices = ['Linux', 'MacOS', 'iOS', 'Windows', 'Android', 'other'];
        const deviceDataCount = Object.fromEntries(defaultDevices.map(device => [device, 0]));

        analytics.forEach(item => {
          const date = new Date(item.timestamp);
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          const key = `${month} ${year}`;

          if (!monthlyData[key]) {
            monthlyData[key] = 0;
          }
          monthlyData[key] += item.clickCount;

          const device = defaultDevices.includes(item.deviceType) ? item.deviceType : 'other';
          deviceDataCount[device] += item.clickCount;

          if (item.clickType === 'link') {
            siteClicks[item.buttonName] = (siteClicks[item.buttonName] || 0) + item.clickCount;
          }
        });

        // Generate the last 6 months
        const lastSixMonths = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const pastDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const month = pastDate.toLocaleString('default', { month: 'short' });
          const year = pastDate.getFullYear();
          lastSixMonths.push(`${month} ${year}`);
        }

        // Ensure all last 6 months are present in the chart data
        const chartData = lastSixMonths.map(month => ({
          month,
          count: monthlyData[month] || 0
        }));

        const deviceChartData = Object.keys(deviceDataCount).map(device => ({
          device,
          count: deviceDataCount[device]
        }));

        const siteChartData = Object.keys(siteClicks).map(buttonName => ({
          name: buttonName,
          value: siteClicks[buttonName]
        }));

        setAnalyticsData(chartData);
        setDeviceData(deviceChartData);
        setSiteData(siteChartData);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const COLORS = ['#165534', '#3EE58F', '#94E9B8', '#21AF66'];

  return (
    <div className={styles.container}>
      <Heading />

      <div className={styles.chartDiv}>

        <div className={styles.heading}>
          <p>Overview</p>
          {/* <span>Coming soon</span> */}
        </div>

        <div className={styles.linkSection}>
          <div className={styles.linkBox}>
            <label>Clicks on Link</label>
            <p className={styles.linkCounter}>{linkCount}</p>
          </div>
          <div className={styles.linkBox + ' ' + styles.linkBox2}>
            <label>Clicks on Shop</label>
            <p className={styles.linkCounter}>{shopCount}</p>
          </div>
          <div className={styles.linkBox + ' ' + styles.linkBox2}>
            <label>CTA</label>
            <p className={styles.linkCounter}>{ctaCount}</p>
          </div>
        </div>

        <div className={styles.chartSection}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.twoChartSection}>
          <div className={styles.chartSection}>
            <label>Traffic by Device</label>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceData}>
                <XAxis dataKey="device" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#22D679" />
              </BarChart>
            </ResponsiveContainer></div>
          <div className={styles.chartSection}>
            <label>Sites</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer width={250} height={250}>
                <PieChart>
                  <Pie
                    data={siteData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {siteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginLeft: '20px' }}>
                {siteData.map((entry, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <p>{entry.name}: {entry.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.barChartSection}>
          <label>Traffic by Device</label>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={siteData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value">
                {siteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
