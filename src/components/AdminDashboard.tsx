import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, Video, SuccessStory } from '../types';
import { 
  Users, 
  Video as VideoIcon, 
  Star, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  TrendingUp,
  LogOut,
  Play,
  Upload
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'videos' | 'stories'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch all user profiles from the profiles table
      const { data: profileUsers, error: profileError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profileError) {
        console.error('Error fetching profiles:', profileError);
        // Fallback to showing current user only
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          const adminUser: User = {
            id: currentUser.id,
            email: currentUser.email || '',
            full_name: currentUser.user_metadata?.full_name || 'Admin',
            subscription_status: 'advanced',
            created_at: currentUser.created_at || new Date().toISOString(),
            last_login: currentUser.last_sign_in_at || undefined
          };
          setUsers([adminUser]);
        }
      } else {
        // Convert profiles to User type
        const formattedUsers: User[] = profileUsers.map(profile => ({
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name || '',
          subscription_status: profile.subscription_status || 'unpaid',
          created_at: profile.created_at,
          last_login: profile.last_login || undefined
        }));
        setUsers(formattedUsers);
      }
      
    } catch (error) {
      console.error('Error in fetchData:', error);
      setUsers([]);
    }
    
    setVideos([
      { id: '1', title: 'Forex Basics Introduction', description: 'Learn the fundamentals of forex trading', video_url: 'https://example.com/video1', module: 'Forex Basics', order_index: 1, package_type: 'both', created_at: '2024-01-01' },
      { id: '2', title: 'SMC Market Structure', description: 'Understanding institutional market structure', video_url: 'https://example.com/video2', module: 'SMC Course', order_index: 1, package_type: 'both', created_at: '2024-01-02' },
      { id: '3', title: 'Elliott Wave Patterns', description: 'Advanced wave analysis techniques', video_url: 'https://example.com/video3', module: 'Elliott Wave', order_index: 1, package_type: 'advanced', created_at: '2024-01-03' },
    ]);
    
    setStories([
      { id: '1', student_name: 'Sarah Johnson', profit_amount: '$45,000', timeframe: '6 months', testimonial: 'Amazing course that changed my life!', image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_featured: true, created_at: '2024-01-01' },
      { id: '2', student_name: 'Michael Chen', profit_amount: '$78,000', timeframe: '8 months', testimonial: 'Best investment I ever made.', image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_featured: true, created_at: '2024-01-02' },
    ]);
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStories = stories.filter(story =>
    story.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
              <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.filter(u => u.subscription_status !== 'unpaid').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <VideoIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Videos</p>
                <p className="text-2xl font-semibold text-gray-900">{videos.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Stories</p>
                <p className="text-2xl font-semibold text-gray-900">{stories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'users', label: 'Users', icon: Users },
                { id: 'videos', label: 'Videos', icon: VideoIcon },
                { id: 'stories', label: 'Success Stories', icon: Star },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                />
              </div>
              
              {activeTab !== 'users' && (
                <button
                  onClick={() => {
                    if (activeTab === 'videos') setShowVideoModal(true);
                    if (activeTab === 'stories') setShowStoryModal(true);
                  }}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add {activeTab === 'videos' ? 'Video' : 'Story'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.subscription_status === 'advanced' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : user.subscription_status === 'starter'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.subscription_status === 'unpaid' ? 'Unpaid' : 
                             user.subscription_status === 'starter' ? 'Starter' : 'Advanced'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-emerald-600 hover:text-emerald-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          video.package_type === 'both' ? 'bg-purple-100 text-purple-800' :
                          video.package_type === 'advanced' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {video.package_type === 'both' ? 'Both Packages' : 
                           video.package_type === 'advanced' ? 'Advanced Only' : 'Starter Only'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                      <p className="text-xs text-gray-500 mb-3">Module: {video.module}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingVideo(video);
                            setShowVideoModal(true);
                          }}
                          className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded text-sm hover:bg-emerald-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'stories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <div key={story.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      {story.image_url && (
                        <img 
                          src={story.image_url} 
                          alt={story.student_name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{story.student_name}</h4>
                        <div className="flex items-center">
                          {story.is_featured && (
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          )}
                          <span className="text-sm text-gray-500">
                            {story.is_featured ? 'Featured' : 'Regular'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">"{story.testimonial}"</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-emerald-600">{story.profit_amount}</span>
                      <span className="text-sm text-gray-500">in {story.timeframe}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingStory(story);
                          setShowStoryModal(true);
                        }}
                        className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded text-sm hover:bg-emerald-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <VideoModal
          video={editingVideo}
          onClose={() => {
            setShowVideoModal(false);
            setEditingVideo(null);
          }}
          onSave={(video) => {
            if (editingVideo) {
              setVideos(videos.map(v => v.id === video.id ? video : v));
            } else {
              setVideos([...videos, { ...video, id: Date.now().toString(), created_at: new Date().toISOString() }]);
            }
            setShowVideoModal(false);
            setEditingVideo(null);
          }}
        />
      )}

      {/* Story Modal */}
      {showStoryModal && (
        <StoryModal
          story={editingStory}
          onClose={() => {
            setShowStoryModal(false);
            setEditingStory(null);
          }}
          onSave={(story) => {
            if (editingStory) {
              setStories(stories.map(s => s.id === story.id ? story : s));
            } else {
              setStories([...stories, { ...story, id: Date.now().toString(), created_at: new Date().toISOString() }]);
            }
            setShowStoryModal(false);
            setEditingStory(null);
          }}
        />
      )}
    </div>
  );
}

// Video Modal Component
function VideoModal({ video, onClose, onSave }: {
  video: Video | null;
  onClose: () => void;
  onSave: (video: Video) => void;
}) {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    description: video?.description || '',
    video_url: video?.video_url || '',
    thumbnail_url: video?.thumbnail_url || '',
    module: video?.module || '',
    order_index: video?.order_index || 1,
    package_type: video?.package_type || 'both' as 'starter' | 'advanced' | 'both',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: video?.id || '',
      created_at: video?.created_at || '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {video ? 'Edit Video' : 'Add New Video'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                <input
                  type="text"
                  value={formData.module}
                  onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                <select
                  value={formData.package_type}
                  onChange={(e) => setFormData({ ...formData, package_type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="both">Both Packages</option>
                  <option value="starter">Starter Only</option>
                  <option value="advanced">Advanced Only</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {video ? 'Update' : 'Create'} Video
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Story Modal Component
function StoryModal({ story, onClose, onSave }: {
  story: SuccessStory | null;
  onClose: () => void;
  onSave: (story: SuccessStory) => void;
}) {
  const [formData, setFormData] = useState({
    student_name: story?.student_name || '',
    profit_amount: story?.profit_amount || '',
    timeframe: story?.timeframe || '',
    testimonial: story?.testimonial || '',
    image_url: story?.image_url || '',
    is_featured: story?.is_featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: story?.id || '',
      created_at: story?.created_at || '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {story ? 'Edit Success Story' : 'Add New Success Story'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                value={formData.student_name}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profit Amount</label>
                <input
                  type="text"
                  value={formData.profit_amount}
                  onChange={(e) => setFormData({ ...formData, profit_amount: e.target.value })}
                  placeholder="$45,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                <input
                  type="text"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  placeholder="6 months"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
              <textarea
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={4}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured Story
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {story ? 'Update' : 'Create'} Story
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}