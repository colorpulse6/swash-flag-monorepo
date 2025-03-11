import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FlagService from '../../../api/FlagsService.ts';

const CreateFlagModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [flagName, setFlagName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: FlagService.createFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
      setFlagName('');
      setErrorMessage(null);
      onClose();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flagName.trim()) {
      mutation.mutate(flagName);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="card w-96 font-medium text-gray-700">
        <h2 className="text-xl font-bold mb-4">Create Feature Flag</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Flag Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={flagName}
              onChange={(e) => setFlagName(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlagModal;
