import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Cog6ToothIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          App settings and preferences coming soon.
        </p>
      </div>
    </div>
  );
};

export default Settings;