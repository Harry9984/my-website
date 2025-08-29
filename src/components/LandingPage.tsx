import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Award, 
  BookOpen, 
  DollarSign, 
  BarChart3, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play,
  Target,
  Zap,
  Globe,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [expandedTopics, setExpandedTopics] = useState<{[key: string]: boolean}>({});

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">The Market Secret</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#course" className="text-gray-600 hover:text-gray-900 transition-colors">Course</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Success Stories</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <button 
                onClick={() => navigate('/auth')}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                #1 Forex Trading Course
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Forex Trading
                <span className="block text-emerald-600">From Zero to Pro</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn proven strategies, risk management, and psychology from expert traders. Join thousands of successful students who transformed their financial future.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">85%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">10K+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">$2M+</div>
                  <div className="text-sm text-gray-600">Profits Generated</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Now
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Trading Dashboard</h3>
                  <div className="flex items-center text-emerald-600">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">+24.5%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-gray-600">EUR/USD</span>
                    <span className="text-sm font-semibold text-emerald-600">+$1,250</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-600">GBP/JPY</span>
                    <span className="text-sm font-semibold text-blue-600">+$890</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm text-gray-600">USD/CAD</span>
                    <span className="text-sm font-semibold text-indigo-600">+$675</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section id="course" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Forex Mastery Curriculum</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive 6-module program takes you from complete beginner to profitable trader
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Forex Fundamentals",
                lessons: "12 lessons",
                duration: "3 hours",
                description: "Learn currency pairs, market structure, and basic terminology",
                color: "emerald"
              },
              {
                icon: BarChart3,
                title: "Technical Analysis",
                lessons: "18 lessons",
                duration: "5 hours",
                description: "Master chart patterns, indicators, and price action strategies",
                color: "blue"
              },
              {
                icon: Target,
                title: "Trading Strategies",
                lessons: "15 lessons",
                duration: "4 hours",
                description: "Proven strategies for scalping, day trading, and swing trading",
                color: "indigo"
              },
              {
                icon: Shield,
                title: "Risk Management",
                lessons: "10 lessons",
                duration: "2.5 hours",
                description: "Protect your capital with proper position sizing and stop losses",
                color: "red"
              },
              {
                icon: Zap,
                title: "Trading Psychology",
                lessons: "8 lessons",
                duration: "2 hours",
                description: "Develop the mindset of successful traders and control emotions",
                color: "purple"
              },
              {
                icon: Globe,
                title: "Live Trading",
                lessons: "20 sessions",
                duration: "10 hours",
                description: "Practice with real market conditions and expert guidance",
                color: "orange"
              }
            ].map((module, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 bg-${module.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <module.icon className={`w-6 h-6 text-${module.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{module.lessons}</span>
                  <span className="mx-2">•</span>
                  <span>{module.duration}</span>
                </div>
                <p className="text-gray-600">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-xl text-gray-600">Real results from real students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                profit: "$45,000",
                timeframe: "6 months",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                quote: "I went from knowing nothing about forex to making consistent profits. The course structure is amazing!"
              },
              {
                name: "Michael Chen",
                profit: "$78,000",
                timeframe: "8 months",
                image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                quote: "The risk management module saved me from huge losses. Now I trade with confidence and discipline."
              },
              {
                name: "Emma Rodriguez",
                profit: "$32,000",
                timeframe: "4 months",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                quote: "The live trading sessions were game-changers. Learning from real market conditions made all the difference."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">{testimonial.profit}</span>
                  <span className="text-sm text-gray-500">in {testimonial.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path to Success</h2>
            <p className="text-xl text-gray-600">Flexible pricing options to fit your learning style</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Package */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-500 transition-colors h-fit min-h-[400px]">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Package</h3>
                <p className="text-gray-600 mb-4">Perfect for beginners who want a solid foundation in Forex trading and Smart Money Concepts (SMC).</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">$497</div>
                <p className="text-gray-500">One-time payment</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                {[
                  {
                    id: "forex-basics",
                    title: "Forex Basics",
                    description: "Understand the foundations of currency trading."
                  },
                  {
                    id: "smc-course",
                    title: "SMC Full Course",
                    description: "Learn Smart Money Concepts used by professional traders."
                  },
                  {
                    id: "smc-trade-plan",
                    title: "SMC Trade Plan",
                    description: "Step-by-step plan for executing trades with SMC strategies."
                  },
                  {
                    id: "risk-management",
                    title: "Risk Management",
                    description: "Learn how to protect your capital and trade safely."
                  },
                  {
                    id: "psychology-mindset",
                    title: "Psychology & Mindset Mastery (Basic)",
                    description: "Build discipline, patience, and a strong trading mindset."
                  }
                ].map((topic) => (
                  <div key={topic.id} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleTopic(topic.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{topic.title}</span>
                      </div>
                      {expandedTopics[topic.id] ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 transition-transform" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedTopics[topic.id] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-4 pb-4 pl-12">
                        <p className="text-gray-600 text-sm">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/auth')}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Get Starter Package
              </button>
            </div>

            {/* Advanced Package */}
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-2xl p-6 relative overflow-hidden h-fit min-h-[400px]">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Advanced Package</h3>
                <p className="text-emerald-100 mb-6">For traders who want to master SMC, Elliott Wave, and advanced trading strategies with live guidance.</p>
                <div className="text-5xl font-bold mb-2">$997</div>
                <p className="text-emerald-100">One-time payment</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-white mb-3">Includes:</h4>
                {[
                  {
                    id: "advanced-forex-basics",
                    title: "Forex Basics",
                    description: "Reinforce foundational knowledge."
                  },
                  {
                    id: "advanced-smc-course",
                    title: "SMC Full Course",
                    description: "In-depth study of institutional trading strategies."
                  },
                  {
                    id: "advanced-smc-trade-plan",
                    title: "SMC Trade Plan",
                    description: "Execute SMC trades with confidence."
                  },
                  {
                    id: "elliott-wave-course",
                    title: "Elliott Wave Full Course",
                    description: "Learn wave analysis to predict market movements."
                  },
                  {
                    id: "elliott-wave-trade-plan",
                    title: "Elliott Wave Trade Plan",
                    description: "Practical trade plan using Elliott Wave strategies."
                  },
                  {
                    id: "smc-wave-trade-plan",
                    title: "SMC + Wave Trade Plan",
                    description: "Combined strategies for high-probability trades."
                  },
                  {
                    id: "advanced-risk-management",
                    title: "Risk Management",
                    description: "Advanced techniques to protect and grow your capital."
                  },
                  {
                    id: "advanced-psychology-mindset",
                    title: "Psychology & Mindset Mastery (Full Course)",
                    description: "Complete program to master trading emotions and mindset."
                  },
                  {
                    id: "weekly-live-mentorship",
                    title: "Weekly Live Mentorship",
                    description: "Two live Zoom sessions per week with Huzaifar to discuss trades, ask questions, and get personalized guidance."
                  }
                ].map((topic) => (
                  <div key={topic.id} className="border border-white/20 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleTopic(topic.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                        <span className="text-white font-medium">{topic.title}</span>
                      </div>
                      {expandedTopics[topic.id] ? (
                        <ChevronDown className="w-5 h-5 text-white/70 transition-transform" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-white/70 transition-transform" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedTopics[topic.id] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-4 pb-4 pl-12">
                        <p className="text-white/80 text-sm">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/auth')}
                className="w-full bg-white text-emerald-600 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Get Advanced Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of successful traders who started their journey with The Market Secret
          </p>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
                <span className="text-xl font-bold">The Market Secret</span>
              </div>
              <p className="text-gray-400">
                Empowering traders worldwide with proven strategies and expert guidance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Course</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="mb-8 text-left max-w-4xl mx-auto">
              <h4 className="font-semibold text-white mb-4 text-center">NO REFUND Policy</h4>
              <p className="text-sm text-gray-400 mb-6 text-center">
                All sales are final. No refunds will be provided under any circumstances.
              </p>
              
              <h4 className="font-semibold text-white mb-4">Risk Disclaimer / Warning</h4>
              <div className="text-sm text-gray-400 space-y-4">
                <p className="font-semibold text-red-400">Important Risk Disclosure:</p>
                <p>
                  Trading Forex and other financial instruments involves a high level of risk and may not be suitable for all investors. The potential for profit is accompanied by the risk of significant losses, including the possible loss of your entire investment. Before engaging in trading, it is essential to carefully consider your financial situation, trading experience, and risk tolerance.
                </p>
                <p>
                  The content, strategies, and information provided in The Market Secret course are for educational purposes only. They are intended to help you learn how professional traders analyze the market, manage risk, and develop a disciplined trading mindset. This course does not provide financial, investment, or trading advice, and should not be construed as such. You are responsible for your own trading decisions and results.
                </p>
                <p>
                  Past performance or examples shown in this course do not guarantee future results. All trading involves uncertainty, and no system or strategy can eliminate the possibility of loss. We strongly recommend that you trade responsibly, use proper risk management, and never invest funds that you cannot afford to lose.
                </p>
                <p>
                  By accessing this website or enrolling in this course, you acknowledge and agree that trading carries inherent risks and that The Market Secret, its instructors, and affiliates are not liable for any financial losses or damages that may occur. Always conduct your own research and consult with a qualified financial advisor if necessary.
                </p>
              </div>
            </div>
            <p>&copy; 2024 The Market Secret. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}