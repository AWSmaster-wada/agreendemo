import React, { useState } from 'react';
import InputSection from './InputSection';
import OutputSection from './OutputSection';
import { generateListing } from '../utils/generateListing';
import { Sprout } from 'lucide-react';

const JobListingGenerator: React.FC = () => {
  const [companyInput, setCompanyInput] = useState('');
  const [jobInput, setJobInput] = useState('');
  const [candidateInput, setCandidateInput] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState<{
    company: string;
    job: string;
    candidate: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!companyInput.trim() || !jobInput.trim() || !candidateInput.trim()) {
      alert('すべてのセクションに情報を入力してください。');
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = generateListing(companyInput, jobInput, candidateInput);
      setGeneratedOutput(result);
      setIsGenerating(false);
    }, 800);
  };

  const handleReset = () => {
    setCompanyInput('');
    setJobInput('');
    setCandidateInput('');
    setGeneratedOutput(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <Sprout className="text-green-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-green-800">農業求人文章ジェネレーター</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          各セクションに関連する情報を入力して、プロフェッショナルな農業求人の募集文章を自動で作成します。
          各セクションは約300文字で生成されます。
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">入力情報</h2>
          
          <InputSection
            id="company"
            label="会社（農園）について"
            placeholder="農園の歴史、規模、栽培している作物、特色、理念などについて記入してください。"
            value={companyInput}
            onChange={setCompanyInput}
          />
          
          <InputSection
            id="job"
            label="仕事内容"
            placeholder="具体的な業務内容、勤務時間、給与、福利厚生などについて記入してください。"
            value={jobInput}
            onChange={setJobInput}
          />
          
          <InputSection
            id="candidate"
            label="求める人材"
            placeholder="必要なスキル、経験、資格、人柄などについて記入してください。"
            value={candidateInput}
            onChange={setCandidateInput}
          />
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 flex-1 disabled:opacity-70"
            >
              {isGenerating ? '生成中...' : '求人文章を生成する'}
            </button>
            <button
              onClick={handleReset}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              リセット
            </button>
          </div>
        </div>

        <OutputSection generatedOutput={generatedOutput} isGenerating={isGenerating} />
      </div>
    </div>
  );
};

export default JobListingGenerator;