import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const SpamReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Spam Reports</h3>
        <p className="mt-1 text-sm text-gray-500">
          Report and manage spam calls coming soon.
        </p>
      </div>
    </div>
  );
};

export default SpamReports;