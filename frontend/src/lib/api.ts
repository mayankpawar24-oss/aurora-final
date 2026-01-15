// Python FastAPI Backend API Client
const API_BASE_URL = 'http://localhost:8000';

export const mineAPI = {
  async getMines() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mines`);
      if (!response.ok) throw new Error('Failed to fetch mines');
      const data = await response.json();
      return data.mines || [];
    } catch (error) {
      console.error('Error fetching mines:', error);
      throw error;
    }
  },

  async getMineById(id: string) {
    const response = await fetch(`${API_BASE_URL}/mines/${id}`);
    if (!response.ok) throw new Error('Failed to fetch mine');
    return response.json();
  },

  async createMine(mineData: any) {
    const response = await fetch(`${API_BASE_URL}/mines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mineData)
    });
    if (!response.ok) throw new Error('Failed to create mine');
    return response.json();
  },

  async updateMine(id: string, mineData: any) {
    const response = await fetch(`${API_BASE_URL}/mines/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mineData)
    });
    if (!response.ok) throw new Error('Failed to update mine');
    return response.json();
  }
};

export const alertAPI = {
  async getAlerts(mineId: string) {
    const response = await fetch(`${API_BASE_URL}/alerts/${mineId}`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  },

  async createAlert(alertData: any) {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData)
    });
    if (!response.ok) throw new Error('Failed to create alert');
    return response.json();
  }
};

export const analyticsAPI = {
  async getAnalytics(mineId: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const url = `${API_BASE_URL}/analytics/${mineId}${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  },

  async createAnalytics(analyticsData: any) {
    const response = await fetch(`${API_BASE_URL}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyticsData)
    });
    if (!response.ok) throw new Error('Failed to create analytics');
    return response.json();
  }
};

export const insightsAPI = {
  async getInsights(mineId: string, days: number = 30) {
    const response = await fetch(`${API_BASE_URL}/insights/${mineId}?days=${days}`);
    if (!response.ok) throw new Error('Failed to fetch insights');
    return response.json();
  }
};

export const monitoringAPI = {
  async startMonitoring(mineId: string, startDate?: string, endDate?: string) {
    try {
      let start = startDate || (() => {
        const today = new Date();
        const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
        return oneYearAgo.toISOString().slice(0, 7); // YYYY-MM
      })();
      
      let end = endDate || (() => {
        const today = new Date();
        return today.toISOString().slice(0, 7); // YYYY-MM
      })();
      
      // If start and end dates are the same, expand the range to at least 3 months
      if (start === end) {
        const startDateObj = new Date(start + '-01');
        const endDateObj = new Date(start + '-01');
        endDateObj.setMonth(endDateObj.getMonth() + 3); // Add 3 months
        end = endDateObj.toISOString().slice(0, 7);
      }
      
      console.log(`📊 Analyzing ${mineId} from ${start} to ${end}`);
      
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mine_id: mineId,
          start_date: start,
          end_date: end
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', response.status, errorText);
        throw new Error(`Analysis failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Analysis complete:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in startMonitoring:', error);
      throw error;
    }
  }
};

export const healthAPI = {
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
};
