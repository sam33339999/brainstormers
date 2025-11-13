'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const methods = [
    {
      id: 'big-mind-mapping',
      name: '大心智圖',
      icon: '🗺️',
      description: '在廣泛的範圍內探索想法，以收集最多的創意解決方案。',
      whenToUse: '當您迷失方向並想要收集最多想法時的完美選擇',
      gradient: 'from-blue-500 to-cyan-500',
      examples: ['產品功能腦力激盪', '商業模式探索', '內容創意生成']
    },
    {
      id: 'reverse-brainstorming',
      name: '反向腦力激盪',
      icon: '🔄',
      description: '找出造成問題的方式，以揭示潛在問題和創新解決方案。',
      whenToUse: '非常適合發現潛在問題並提出創新解決方案',
      gradient: 'from-purple-500 to-pink-500',
      examples: ['改善客戶保留率', '識別安全漏洞', '預防專案失敗']
    },
    {
      id: 'role-storming',
      name: '角色扮演',
      icon: '🎭',
      description: '採用不同視角來產生多元見解和創意解決方案。',
      whenToUse: '非常適合從不同觀點和利害關係人那裡收集見解',
      gradient: 'from-green-500 to-teal-500',
      examples: ['使用者體驗設計', '利害關係人問題解決', '包容性解決方案創建']
    },
    {
      id: 'scamper',
      name: 'SCAMPER',
      icon: '🔧',
      description: '使用替代、組合、調整、修改、挪作他用、消除、反轉系統性地轉換想法。',
      whenToUse: '非常適合透過系統化轉換來改善現有想法或產品',
      gradient: 'from-orange-500 to-red-500',
      examples: ['產品改良', '流程創新', '資源優化']
    },
    {
      id: 'six-thinking-hats',
      name: '六頂思考帽',
      icon: '🎩',
      description: '從六個角度檢視問題：資料、情感、風險、好處、創意和流程。',
      whenToUse: '非常適合全面分析和平衡決策',
      gradient: 'from-indigo-500 to-purple-500',
      examples: ['商業決策', '專案評估', '複雜問題分析']
    },
    {
      id: 'starbursting',
      name: '星爆法',
      icon: '⭐',
      description: '使用 5W1H（誰、什麼、哪裡、何時、為何、如何）產生全面的問題，進行徹底探索。',
      whenToUse: '非常適合全面探索主題和理解需求',
      gradient: 'from-yellow-500 to-orange-500',
      examples: ['專案規劃', '客戶研究', '市場探索']
    }
  ];

  const handleStartBrainstorming = (methodId: string) => {
    // Navigate to the chat interface with the selected method as a parameter
    window.location.href = `/chat?method=${methodId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Brainstormers</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">選擇您的腦力激盪方法</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/method-config">
                <Button variant="outline" size="sm">
                  <span className="mr-2">⚙️</span>
                  方法配置
                </Button>
              </Link>
              <Link href="/setup">
                <Button variant="outline" size="sm">
                  <span className="mr-2">🔧</span>
                  基础设置
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            選擇您的<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">腦力激盪方法</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            每種方法都是為特定的創意挑戰而設計。選擇最適合您當前需求的方法。
          </p>
        </div>

        {/* Method Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {methods.map((method) => (
            <Card
              key={method.id}
              className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                selectedMethod === method.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="p-6">
                {/* Method Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.gradient} flex items-center justify-center text-2xl`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{method.name}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                  {method.description}
                </p>

                {/* When to Use */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">適用時機</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{method.whenToUse}</p>
                </div>

                {/* Examples */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">範例</div>
                  <div className="flex flex-wrap gap-1">
                    {method.examples.map((example, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full text-slate-600 dark:text-slate-300"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartBrainstorming(method.id);
                  }}
                  className={`w-full bg-gradient-to-r ${method.gradient} text-white hover:opacity-90 transition-opacity`}
                >
                  <span className="mr-2">✨</span>
                  開始 {method.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Start Section */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">不確定要選擇哪種方法？</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              根據您的特定挑戰嘗試我們的快速建議，或從大心智圖開始進行一般探索。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                <span className="mr-2">🎯</span>
                獲取建議
              </Button>
              <Button
                onClick={() => handleStartBrainstorming('big-mind-mapping')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
              >
                <span className="mr-2">🗺️</span>
                從大心智圖開始
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}