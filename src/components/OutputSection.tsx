import React, { useRef } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface OutputSectionProps {
  generatedOutput: {
    company: string;
    job: string;
    candidate: string;
  } | null;
  isGenerating: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({ generatedOutput, isGenerating }) => {
  const [copied, setCopied] = React.useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (!outputRef.current || !generatedOutput) return;
    
    const content = `【会社（農園）について】\n${generatedOutput.company}\n\n【仕事内容】\n${generatedOutput.job}\n\n【求める人材】\n${generatedOutput.candidate}`;
    
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderPlaceholder = () => (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
      <div className="w-16 h-16 mb-4 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
        <span className="text-2xl">→</span>
      </div>
      <p className="text-center">
        左側のフォームに情報を入力して「求人文章を生成する」ボタンをクリックすると、ここに生成された文章が表示されます。
      </p>
    </div>
  );

  const renderContent = () => (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-green-700">生成された求人文章</h2>
        <button
          onClick={handleCopy}
          className="flex items-center text-sm text-gray-600 hover:text-green-700 transition-colors duration-200"
        >
          {copied ? (
            <>
              <CheckCircle size={16} className="mr-1 text-green-600" />
              <span>コピーしました</span>
            </>
          ) : (
            <>
              <Copy size={16} className="mr-1" />
              <span>全文コピー</span>
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-6" ref={outputRef}>
        <section>
          <h3 className="text-lg font-medium text-amber-700 mb-2 pb-1 border-b border-amber-200">
            【会社（農園）について】
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {generatedOutput?.company}
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-medium text-amber-700 mb-2 pb-1 border-b border-amber-200">
            【仕事内容】
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {generatedOutput?.job}
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-medium text-amber-700 mb-2 pb-1 border-b border-amber-200">
            【求める人材】
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {generatedOutput?.candidate}
          </p>
        </section>
      </div>
    </>
  );

  const renderGenerating = () => (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-green-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-green-400 animate-ping"></div>
        </div>
        <p className="text-green-700">求人文章を生成中...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[500px] flex flex-col">
      {isGenerating && renderGenerating()}
      {!isGenerating && generatedOutput && renderContent()}
      {!isGenerating && !generatedOutput && renderPlaceholder()}
    </div>
  );
};

export default OutputSection;