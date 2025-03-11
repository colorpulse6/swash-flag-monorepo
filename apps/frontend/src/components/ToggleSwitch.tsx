import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
        enabled ? 'bg-success' : 'bg-secondary'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
