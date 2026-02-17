import React, { useState } from "react";
import { getLockExpiry } from "../services/usageTracker";
import { Language, languageNames } from "../translations";

interface UsageLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UsageLimitDialog: React.FC<UsageLimitDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [dialogLang, setDialogLang] = useState<Language>("en");

  if (!isOpen) return null;

  const lockExpiry = getLockExpiry();
  const expiryTime = lockExpiry ? lockExpiry.toLocaleTimeString() : "";

  const content = {
    en: {
      title: "Usage Limit Reached",
      message1: "This is a demo project, hope you enjoyed it!",
      message2: "Usage limit reached. Please try again later ☕",
      timerInfo: `Available again in 8 hours (around ${expiryTime})`,
      infoText:
        "This demo has a limit of 10 AI conversations per session to manage API costs.",
      thanks: "Thank you for understanding! 🙏",
      button: "Got it!",
    },
    "zh-TW": {
      title: "使用次數已達上限",
      message1: "這是個體驗專案，希望你喜歡！",
      message2: "目前額度使用完畢。請晚點再試哦 ☕",
      timerInfo: `8小時後可再次使用 (約 ${expiryTime})`,
      infoText: "此體驗專案限制每次 10 次 AI 對話，以控制 API 成本。",
      thanks: "感謝您的理解！🙏",
      button: "了解！",
    },
  };

  const t = content[dialogLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-zoomIn">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white">{t.title}</h2>
            </div>
            {/* Language Selector */}
            <select
              value={dialogLang}
              onChange={(e) => setDialogLang(e.target.value as Language)}
              className="bg-white/20 text-white border border-white/30 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {(["en", "zh-TW"] as Language[]).map((lang) => (
                <option key={lang} value={lang} className="text-slate-800">
                  {languageNames[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Friendly Message */}
          <div className="text-center mb-6">
            <p className="text-lg text-slate-700 mb-3">{t.message1}</p>
            <p className="text-slate-600">{t.message2}</p>
          </div>

          {/* Timer Info */}
          {lockExpiry && (
            <div className="bg-amber-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-amber-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{t.timerInfo}</span>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500">
              {t.infoText}
              <br />
              {t.thanks}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
          >
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsageLimitDialog;
