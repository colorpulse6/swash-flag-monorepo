import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FlagService from '../../api/FlagsService.ts';
import ToggleSwitch from '../../components/ToggleSwitch.tsx';
import ConfirmDeleteFlagDialog from './components/ConfirmDeleteFlagDialog.tsx';
import CreateFlagModal from './components/CreateFlagModal.tsx';
import { SkeletonLoader } from '../../components/SkeletonLoader.tsx';

const FlagsPage = () => {
  const queryClient = useQueryClient();
  const [flagToDelete, setFlagToDelete] = useState<string | null>(null);
  const [isCreateFlagModalOpen, setIsCreateFlagModalOpen] = useState(false);

  const {
    data: flags,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['flags'],
    queryFn: FlagService.fetchFlags,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      FlagService.toggleFlag(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: FlagService.deleteFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
      setFlagToDelete(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDelete = (id: string) => {
    setFlagToDelete(id);
  };

  const confirmDelete = () => {
    if (flagToDelete) {
      deleteMutation.mutate(flagToDelete);
    }
  };

  if (isLoading) return <SkeletonLoader type="flags" />;

  if (isError) {
    return (
      <p className="text-red-600">Error: {error && (error as Error).message}</p>
    );
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Feature Flags</h2>
      <ul className="space-y-3">
        {Array.isArray(flags) &&
          flags?.map((flag) => (
            <div
              key={flag.id}
              className="bg-gray-800 shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <span className="font-medium">{flag.name}</span>
              <div className="flex items-center space-x-4">
                <ToggleSwitch
                  enabled={flag.enabled}
                  onChange={() =>
                    toggleMutation.mutate({
                      id: flag.id,
                      enabled: flag.enabled,
                    })
                  }
                />
                <button
                  onClick={() => handleDelete(flag.id)}
                  className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110 cursor-pointer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
      </ul>

      <button
        onClick={() => setIsCreateFlagModalOpen(true)}
        className="mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        + Add Flag
      </button>

      {isCreateFlagModalOpen && (
        <CreateFlagModal
          isOpen={isCreateFlagModalOpen}
          onClose={() => setIsCreateFlagModalOpen(false)}
        />
      )}

      {flagToDelete && (
        <ConfirmDeleteFlagDialog
          onCancel={() => setFlagToDelete(null)}
          onConfirm={confirmDelete}
          isPending={deleteMutation.isPending}
          itemName="feature flag"
        />
      )}
    </div>
  );
};

export default FlagsPage;
