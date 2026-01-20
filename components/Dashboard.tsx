import React from 'react';
import { DashboardStats, UnitType, OPRData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FileText, Calendar, User, Eye, Briefcase, BookOpen, Trophy, Heart, Users } from 'lucide-react';

interface Props {
  stats: DashboardStats;
  onViewReport: (data: OPRData) => void;
}

// Updated Colors: Red, Orange, Yellow, Gold, Maroon
const COLORS = ['#991b1b', '#f59e0b', '#fbbf24', '#b45309', '#7f1d1d'];

const Dashboard: React.FC<Props> = ({ stats, onViewReport }) => {
  const chartData = Object.entries(stats.byUnit).map(([name, value]) => ({
    name: name,
    value: value
  }));

  // Helper to get icon based on unit
  const getUnitIcon = (unit: string | UnitType) => {
    switch (unit) {
      case UnitType.PENTADBIRAN:
        return <Briefcase className="w-3 h-3 text-gray-600" />;
      case UnitType.KURIKULUM:
        return <BookOpen className="w-3 h-3 text-blue-600" />;
      case UnitType.KOKURIKULUM:
        return <Trophy className="w-3 h-3 text-amber-600" />;
      case UnitType.HEM:
        return <Heart className="w-3 h-3 text-red-500" />;
      case UnitType.PIBG:
        return <Users className="w-3 h-3 text-green-600" />;
      default:
        return <FileText className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Jumlah Laporan</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.totalReports}</h3>
                    </div>
                    <div className="p-3 bg-red-50 rounded-full">
                        <FileText className="w-6 h-6 text-brand-red" />
                    </div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Unit Teraktif</p>
                        <h3 className="text-xl font-bold text-gray-900">
                            {chartData.length > 0 ? chartData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name : '-'}
                        </h3>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-full">
                        <User className="w-6 h-6 text-yellow-600" />
                    </div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Status Sistem</p>
                        <h3 className="text-xl font-bold text-green-600">Aktif</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full">
                        <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>
        </div>

        {/* Charts & Recent List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Statistik Mengikut Unit</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{fontSize: 10}} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#991b1b">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent List */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Laporan Terkini</h3>
                <div className="overflow-y-auto max-h-64 space-y-3">
                    {stats.recentReports.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Tiada laporan terkini.</p>
                    ) : (
                        stats.recentReports.map((report, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-brand-softYellow rounded border border-brand-cream hover:bg-yellow-50 transition">
                                <div className="bg-red-100 p-2 rounded shrink-0">
                                    <FileText className="w-4 h-4 text-brand-red" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-800 truncate">{report.tajukProgram}</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-yellow-200 shadow-sm">
                                            {getUnitIcon(report.unit)}
                                            <span className="text-xs text-gray-600 font-medium">{report.unit}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">{report.tarikh}</span>
                                    </div>
                                </div>
                                <div>
                                    <button 
                                        onClick={() => onViewReport(report)}
                                        className="flex items-center gap-1 text-xs bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 text-gray-700 transition"
                                        title="Lihat Laporan"
                                    >
                                        <Eye className="w-3 h-3" /> Lihat
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default React.memo(Dashboard);