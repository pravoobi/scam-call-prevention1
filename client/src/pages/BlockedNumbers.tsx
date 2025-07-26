import React from 'react';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

const BlockedNumbers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <NoSymbolIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Blocked Numbers</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your blocked numbers list coming soon.
        </p>
      </div>
    </div>
  );
};

export default BlockedNumbers;