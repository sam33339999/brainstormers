'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function SetupPage() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const providers = [
    {
      id: 'openai',
      name: 'OpenAI',
      icon: '🤖',
      description: '市場領先的 LLM 提供商，擁有強大的模型',
      apiKeyUrl: 'https://platform.openai.com/settings/organization/api-keys',
      models: [
        { id: 'o4-mini', name: 'o4-mini', description: '適合複雜查詢和長時間思考，雖然較貴但相對其他推理模型便宜' },
        { id: 'gpt-4o', name: 'gpt-4o', description: '整體優秀，適合複雜思考' },
        { id: 'gpt-4o-mini', name: 'gpt-4o-mini', description: '快速、便宜且優秀' },
        { id: 'gpt-4.1-nano', name: 'gpt-4.1-nano', description: '最便宜且最快，適合簡單用例和快速會話' },
      ]
    },
    {
      id: 'groq',
      name: 'Groq',
      icon: '⚡',
      description: '全球最快的提供商，託管大量開源模型，速度最快且表現最佳',
      apiKeyUrl: 'https://console.groq.com/keys',
      models: [
        { id: 'qwen2.5-32b-instruct', name: 'qwen2.5-32b-instruct', description: '優秀的推理模型，強大且便宜' },
        { id: 'llama-3.3-70b-versatile', name: 'llama-3.3-70b-versatile', description: '最新 Meta 模型，便宜、推理能力好、專家混合' },
        { id: 'deepseek-r1-distill-llama-70b', name: 'deepseek-r1-distill-llama-70b', description: '整體優秀，推理能力好，較貴且複雜' },
      ]
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      icon: '🔮',
      description: '擁有豐富知識的優秀模型，超大上下文視窗讓腦力激盪會話更長，能同時思考更多事情',
      apiKeyUrl: 'https://aistudio.google.com/app/apikey',
      models: [
        { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', description: '增強思考和推理、多模態理解、進階編碼等' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: '適應性思考、成本效益' },
        { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash-8B', description: '最具成本效益的模型，支援高吞吐量' },
      ]
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      icon: '🧠',
      description: '非常優秀的 LLM 提供商，而且超級便宜，是所有提供商中最便宜的，如果你想在預算上追求效率，選擇這個 LLM 提供商真的很完美',
      apiKeyUrl: 'https://platform.deepseek.com/api_keys',
      models: [
        { id: 'deepseek-chat', name: 'deepseek-chat', description: '便宜且整體優秀' },
        { id: 'deepseek-reasoner', name: 'deepseek-reasoner', description: '適合更複雜的任務，較貴但比其他提供商的推理模型便宜' },
      ]
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      icon: '🌐',
      description: '透過單一 API 存取來自不同提供商的多個 AI 模型，非常適合靈活性和測試不同模型',
      apiKeyUrl: 'https://openrouter.ai/keys',
      models: [
        { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', description: 'OpenAI 最強大的模型' },
        { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Anthropic 最新且最智能的模型' },
        { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: '最適合複雜任務' },
        { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet', description: '平衡的性能' },
        { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', description: '快速且經濟實惠' },
        { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5', description: 'Google 的進階模型' },
        { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: 'Meta 的強大開源模型' },
        { id: 'mistralai/mixtral-8x7b-instruct', name: 'Mixtral 8x7B', description: 'Mistral 的專家混合模型' },
      ]
    },
  ];

  const handleContinue = async () => {
    if (!selectedProvider || !apiKey) return;
    
    setIsValidating(true);
    
    try {
      // Save settings to localStorage
      const finalModel = customModel.trim() || selectedModel || getDefaultModel(selectedProvider);
      const settings = {
        apiKey,
        selectedProvider,
        selectedModel: finalModel,
        theme: 'system',
        streamingEnabled: false,
        autoSave: true
      };
      
      localStorage.setItem('brainstorm-settings', JSON.stringify(settings));
      
      // Here we would validate the API key in a real implementation
      setTimeout(() => {
        setIsValidating(false);
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      setIsValidating(false);
      console.error('Error saving settings:', error);
    }
  };

  const getDefaultModel = (providerId: string): string => {
    const provider = providers.find(p => p.id === providerId);
    return provider?.models[0]?.id || 'gpt-4o-mini';
  };

  const getSelectedProvider = () => {
    return providers.find(p => p.id === selectedProvider);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">歡迎使用 Brainstormers</h1>
          <p className="text-slate-600 dark:text-slate-300">
            讓我們設定您偏好的 AI 提供商
          </p>
        </div>

        {/* Introduction Message */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <span className="text-3xl">💡</span>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">關於此開源專案</h2>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                這主要是一個開源專案，我沒有資金將其做成完整產品，所以無法支付 LLM 提供商的費用。
                但您可以透過提供自己想要的 LLM 提供商來享受此產品！
              </p>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                這實際上是一個<strong>絕佳的主意</strong>，因為當您提供自己的 LLM 提供商時，您可以自由使用世界各地的任何 LLM。
                所以目前產品使用以下您可以選擇的提供商：
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="space-y-8">
            {/* Provider Selection */}
            <div>
              <label className="block text-lg font-semibold mb-4">選擇您的 AI 提供商</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`p-5 border rounded-xl cursor-pointer transition-all ${
                      selectedProvider === provider.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 hover:shadow-sm'
                    }`}
                    onClick={() => {
                      setSelectedProvider(provider.id);
                      setSelectedModel('');
                      setCustomModel('');
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl">{provider.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{provider.name}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {provider.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            {selectedProvider && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold">選擇模型</label>
                <div className="grid grid-cols-1 gap-3">
                  {getSelectedProvider()?.models.map((model) => (
                    <div
                      key={model.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedModel === model.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                      }`}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setCustomModel('');
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-slate-500 mt-1">{model.description}</div>
                        </div>
                        {selectedModel === model.id && (
                          <span className="text-green-500 text-xl">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Custom Model Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">或使用自訂模型</label>
                  <Input
                    type="text"
                    placeholder="輸入精確的模型名稱（例如：gpt-4.1-nano-preview）"
                    value={customModel}
                    onChange={(e) => {
                      setCustomModel(e.target.value);
                      if (e.target.value.trim()) {
                        setSelectedModel('');
                      }
                    }}
                    className="font-mono"
                  />
                  <div className="text-xs text-slate-500">
                    請確保輸入提供商指定的精確模型名稱
                  </div>
                </div>
              </div>
            )}

            {/* API Key Input */}
            {selectedProvider && (
              <div className="space-y-3">
                <label className="block text-lg font-semibold">API 金鑰</label>
                <Input
                  type="password"
                  placeholder="輸入您的 API 金鑰..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                />
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span>在此獲取您的 API 金鑰： </span>
                  <Link
                    href={getSelectedProvider()?.apiKeyUrl || '#'}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    {getSelectedProvider()?.apiKeyUrl}
                  </Link>
                </div>
              </div>
            )}

            {/* Security Information */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 p-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">🔒</span>
                <div className="space-y-2">
                  <h3 className="font-medium text-green-800 dark:text-green-200">您的安全是我們的首要任務</h3>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>✓ 您的 API 金鑰安全地儲存在您的瀏覽器中</li>
                    <li>✓ 沒有資料傳送到我們的伺服器 - 一切都在客戶端運行</li>
                    <li>✓ 在 GitHub 上查看我們的開源代碼</li>
                    <li>✓ 您可以隨時撤銷您的金鑰</li>
                  </ul>
                  <div className="pt-2">
                      <Button variant="outline" size="sm" className="text-green-700 border-green-300 hover:bg-green-100">
                        <Link href="https://github.com/Azzedde/brainstormers" target="_blank">

                        <span className="mr-2">📖</span>
                        查看原始碼
                      </Link>
                      </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Continue Button */}
            <div className="flex space-x-3">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  返回
                </Button>
              </Link>
              <Button
                onClick={handleContinue}
                disabled={!selectedProvider || !apiKey || isValidating || (!selectedModel && !customModel.trim())}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
              >
                {isValidating ? (
                  <>
                    <span className="mr-2">⏳</span>
                    驗證中...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    安全繼續
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}