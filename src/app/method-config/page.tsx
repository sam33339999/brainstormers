'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { UserSettings, MethodModelConfig } from '@/types/brainstorm';
import { getAllMethods } from '@/lib/brainstorm/methods';
import { getAllProviders, getProviderModels } from '@/lib/llm/providers';

export default function MethodConfigPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [methodConfigs, setMethodConfigs] = useState<Record<string, MethodModelConfig>>({});
  const [isSaving, setIsSaving] = useState(false);

  const methods = getAllMethods();
  const providers = getAllProviders();

  useEffect(() => {
    // Load existing settings
    try {
      const settingsStr = localStorage.getItem('brainstorm-settings');
      if (settingsStr) {
        const loadedSettings: UserSettings = JSON.parse(settingsStr);
        setSettings(loadedSettings);
        setMethodConfigs(loadedSettings.methodModels || {});
      } else {
        window.location.href = '/setup';
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      window.location.href = '/setup';
    }
  }, []);

  const handleProviderChange = (methodId: string, providerId: string) => {
    setMethodConfigs(prev => ({
      ...prev,
      [methodId]: {
        provider: providerId,
        model: getProviderModels(providerId)[0] || '',
      }
    }));
  };

  const handleModelChange = (methodId: string, model: string) => {
    setMethodConfigs(prev => ({
      ...prev,
      [methodId]: {
        ...prev[methodId],
        model,
      }
    }));
  };

  const handleRemoveConfig = (methodId: string) => {
    setMethodConfigs(prev => {
      const newConfigs = { ...prev };
      delete newConfigs[methodId];
      return newConfigs;
    });
  };

  const handleSave = () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const updatedSettings: UserSettings = {
        ...settings,
        methodModels: methodConfigs,
      };

      localStorage.setItem('brainstorm-settings', JSON.stringify(updatedSettings));

      setTimeout(() => {
        setIsSaving(false);
        window.location.href = '/dashboard';
      }, 500);
    } catch (error) {
      console.error('Error saving settings:', error);
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            ⚙️ 方法模型配置
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            为每个头脑风暴方法配置专门的 AI 模型和提供商
          </p>
        </div>

        {/* Default Settings Info */}
        <Card className="p-6 mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <span className="text-3xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">默认设置</h3>
              <p className="text-blue-800 dark:text-blue-200">
                当前默认提供商: <strong>{settings.selectedProvider}</strong>
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                当前默认模型: <strong>{settings.selectedModel}</strong>
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                如果某个方法没有特定配置，将使用上述默认设置
              </p>
            </div>
          </div>
        </Card>

        {/* Method Configurations */}
        <div className="grid gap-6">
          {methods.map((method) => {
            const config = methodConfigs[method.id];
            const hasConfig = !!config;

            return (
              <Card key={method.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{method.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {method.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  {hasConfig && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveConfig(method.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      🗑️ 移除配置
                    </Button>
                  )}
                </div>

                {hasConfig ? (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {/* Provider Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        提供商
                      </label>
                      <select
                        value={config.provider}
                        onChange={(e) => handleProviderChange(method.id, e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        {providers.map((provider) => (
                          <option key={provider.id} value={provider.id}>
                            {provider.icon} {provider.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Model Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        模型
                      </label>
                      <select
                        value={config.model}
                        onChange={(e) => handleModelChange(method.id, e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        {getProviderModels(config.provider).map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => handleProviderChange(method.id, settings.selectedProvider)}
                      className="w-full md:w-auto"
                    >
                      ➕ 为此方法配置专门模型
                    </Button>
                  </div>
                )}

                {hasConfig && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      ✓ 此方法将使用: <strong>{config.provider}</strong> - <strong>{config.model}</strong>
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Save Buttons */}
        <div className="flex space-x-4 mt-8">
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full">
              ← 返回
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
          >
            {isSaving ? '保存中...' : '💾 保存配置'}
          </Button>
        </div>
      </div>
    </div>
  );
}
