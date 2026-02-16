import React from 'react';
import { useTranslation } from '../LanguageContext';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'info' | 'danger';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  type = 'info',
}) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  // 使用翻譯作為預設值
  const displayConfirmLabel = confirmLabel || t.confirm;
  const displayCancelLabel = cancelLabel || t.cancel;

  const typeColors = {
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-indigo-100 text-indigo-600',
    danger: 'bg-red-100 text-red-600',
  };

  const iconPaths = {
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    danger: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in duration-200">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[type]}`}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={iconPaths[type]}
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            {displayCancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {displayConfirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
