
import React from 'react';
import { Panel } from './Panel';
import { ResetIcon, GenerateIcon } from './Icons';
import type { RestorationOptions } from '../types';

interface ControlPanelProps {
  options: RestorationOptions;
  setOptions: React.Dispatch<React.SetStateAction<RestorationOptions>>;
  onReset: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isImageUploaded: boolean;
}

const RadioOption: React.FC<{
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}> = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <span className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${checked ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'}`}>
      {checked && <span className="w-2 h-2 rounded-full bg-slate-900"></span>}
    </span>
    <span className="text-slate-300">{label}</span>
  </label>
);

const CheckboxOption: React.FC<{
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="hidden"
        />
        <span className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-200 ${checked ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'}`}>
            {checked && <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
        </span>
        <span className="text-slate-300">{label}</span>
    </label>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ options, setOptions, onReset, onGenerate, isGenerating, isImageUploaded }) => {
  const handleOptionChange = <K extends keyof RestorationOptions,>(key: K, value: RestorationOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Panel title="Bảng điều khiển" className="lg:col-span-1">
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-3 text-slate-300">Yêu cầu chính</h3>
                <div className="space-y-2">
                    <RadioOption name="mainRequest" value="high_quality" checked={options.mainRequest === 'high_quality'} onChange={(e) => handleOptionChange('mainRequest', e.target.value as any)} label="Phục chế chất lượng cao" />
                    <RadioOption name="mainRequest" value="original" checked={options.mainRequest === 'original'} onChange={(e) => handleOptionChange('mainRequest', e.target.value as any)} label="Phục chế giữ nguyên bản" />
                    <RadioOption name="mainRequest" value="detailed_face" checked={options.mainRequest === 'detailed_face'} onChange={(e) => handleOptionChange('mainRequest', e.target.value as any)} label="Tái tạo ảnh mặt nhiều chi tiết" />
                    <RadioOption name="mainRequest" value="portrait" checked={options.mainRequest === 'portrait'} onChange={(e) => handleOptionChange('mainRequest', e.target.value as any)} label="Phục chế chân dung (cận mặt)" />
                    <RadioOption name="mainRequest" value="scenery" checked={options.mainRequest === 'scenery'} onChange={(e) => handleOptionChange('mainRequest', e.target.value as any)} label="Phục chế tranh (không có người)" />
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3 text-slate-300">Thông tin chủ thể</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-slate-400">Giới tính</label>
                        <select value={options.gender} onChange={(e) => handleOptionChange('gender', e.target.value as any)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 mt-1 focus:ring-cyan-500 focus:border-cyan-500">
                            <option value="not_specified">Không xác định</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-slate-400">Tuổi (ước chừng)</label>
                        <input type="text" placeholder="e.g. 25" value={options.age} onChange={(e) => handleOptionChange('age', e.target.value)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 mt-1 focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3 text-slate-300">Tùy chọn nâng cao</h3>
                <div className="space-y-2">
                    <CheckboxOption checked={options.keepId} onChange={(e) => handleOptionChange('keepId', e.target.checked)} label="Luôn giữ dấu hiệu nhận dạng" />
                    <CheckboxOption checked={options.remakeHair} onChange={(e) => handleOptionChange('remakeHair', e.target.checked)} label="Tái tạo tóc" />
                    <CheckboxOption checked={options.remakeClothes} onChange={(e) => handleOptionChange('remakeClothes', e.target.checked)} label="Tái tạo trang phục" />
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3 text-slate-300">Yêu cầu bổ sung</h3>
                <textarea
                    value={options.additionalRequest}
                    onChange={(e) => handleOptionChange('additionalRequest', e.target.value)}
                    placeholder="Thêm yêu cầu cụ thể hoặc những điều không được làm. Ví dụ: 'thêm nụ cười nhẹ nhàng, KHÔNG thay đổi màu áo'"
                    rows={3}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
            
            <div className="space-y-3 pt-4">
                <button
                    onClick={onReset}
                    className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 transition-colors text-slate-300 font-semibold py-3 px-4 rounded-lg"
                >
                    <ResetIcon className="w-5 h-5" />
                    <span>Xóa bỏ & Đặt lại</span>
                </button>
                <button
                    onClick={onGenerate}
                    disabled={isGenerating || !isImageUploaded}
                    className="w-full flex items-center justify-center space-x-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-cyan-600/20"
                >
                    <GenerateIcon className="w-5 h-5" />
                    <span>{isGenerating ? 'Đang tạo...' : 'Tạo ảnh'}</span>
                </button>
            </div>
        </div>
    </Panel>
  );
};
