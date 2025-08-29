import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, Video } from '../types';
import { 
  TrendingUp, 
  LogOut, 
  Play, 
  Lock, 
  CheckCircle, 
  BookOpen,
  BarChart3,
  Target,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

interface StudentDashboardProps {
  user: any; // Using any for now since we're using Supabase user type
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Mock data - in real app, fetch from Supabase based on user's subscription
    const mockVideos: Video[] = [
      { id: '1', title: 'Introduction to Forex Markets', description: 'Understanding the basics of currency trading', video_url: 'https://example.com/video1', module: 'Forex Basics', order_index: 1, package_type: 'both', created_at: '2024-01-01' },
      { id: '2', title: 'Currency Pairs Explained', description: 'Major, minor, and exotic currency pairs', video_url: 'https://example.com/video2', module: 'Forex Basics', order_index: 2, package_type: 'both', created_at: '2024-01-01' },
      { id: '3', title: 'Market Structure Basics', description: 'How institutional traders view the market', video_url: 'https://example.com/video3', module: 'SMC Course', order_index: 1, package_type: 'both', created_at: '2024-01-02' },
      { id: '4', title: 'Order Blocks and Fair Value Gaps', description: 'Advanced SMC concepts', video_url: 'https://example.com/video4', module: 'SMC Course', order_index: 2, package_type: 'both', created_at: '2024-01-02' },
      { id: '5', title: 'Elliott Wave Theory', description: 'Understanding wave patterns', video_url: 'https://example.com/video5', module: 'Elliott Wave', order_index: 1, package_type: 'advanced', created_at: '2024-01-03' },
      { id: '6', title: 'Wave Counting Techniques', description: 'Advanced wave analysis', video_url: 'https://example.com/video6', module: 'Elliott Wave', order_index: 2, package_type: 'advanced', created_at: '2024-01-03' },
    ];

    // Filter videos based on user's subscription
    const accessibleVideos = mockVideos.filter(video => 
      video.package_type === 'both' || 
      video.package_type === 'starter' // For now, show starter content to all logged-in users
    );

    setVideos(accessibleVideos);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const modules = ['all', ...Array.from(new Set(videos.map(v => v.module)))];
  const filteredVideos = selectedModule === 'all' 
    ? videos 
    : videos.filter(v => v.module === selectedModule);

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Forex Basics': return BookOpen;
      case 'SMC Course': return BarChart3;
      case 'Elliott Wave': return Target;
      case 'Risk Management': return Shield;
      case 'Psychology': return Zap;
      case 'Live Trading': return Globe;
      default: return Play;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your course content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">The Market Secret</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.user_metadata?.full_name || user.email}</p>
                <p className="text-xs text-gray-500 capitalize">Student</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.user_metadata?.full_name || 'Student'}!</h1>
          <p className="text-emerald-100 mb-4">
            Continue your journey to forex mastery
          </p>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{videos.length}</div>
              <div className="text-sm text-emerald-100">Available Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{modules.length - 1}</div>
              <div className="text-sm text-emerald-100">Course Modules</div>
            </div>
          </div>
        </div>

        {/* Module Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Modules</h2>
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <button
                key={module}
                onClick={() => setSelectedModule(module)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedModule === module
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {module === 'all' ? 'All Modules' : module}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const ModuleIcon = getModuleIcon(video.module);
            const hasAccess = user.subscription_status !== 'unpaid' && (
              video.package_type === 'both' ||
              video.package_type === user.subscription_status ||
              true // For now, give access to all videos for logged-in users
            );

            return (
              <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center relative">
                  {hasAccess ? (
                    <Play className="w-16 h-16 text-white cursor-pointer hover:scale-110 transition-transform" />
                  ) : (
                    <Lock className="w-16 h-16 text-white/70" />
                  )}
                  <div className="absolute top-3 left-3">
                    <ModuleIcon className="w-6 h-6 text-white" />
                  </div>
                  {hasAccess && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      {video.module}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      video.package_type === 'both' ? 'bg-purple-100 text-purple-700' :
                      video.package_type === 'advanced' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {video.package_type === 'both' ? 'All' : video.package_type}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                  
                  {hasAccess ? (
                    <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Now
                    </button>
                  ) : (
                    <div className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Purchase Required
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}