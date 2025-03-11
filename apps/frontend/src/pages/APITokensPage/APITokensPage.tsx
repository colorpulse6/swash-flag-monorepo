import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService.ts';
import { SkeletonLoader } from '../../components/SkeletonLoader.tsx';

export default function ApiTokensPage() {
  const queryClient = useQueryClient();

  const [tokenVisible, setTokenVisible] = useState(false);

  const {
    data: apiTokensResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['apiTokens'],
    queryFn: AuthService.fetchApiTokens,
  });

  const generateTokenMutation = useMutation({
    mutationFn: AuthService.generateApiToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiTokens'] });
    },
  });

  if (isLoading) return <SkeletonLoader type="tokens" />;
  if (isError) return <p>Error loading API tokens.</p>;

  const apiToken = apiTokensResponse || {};

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">API Tokens</h2>
      <div className="flex items-center space-x-3">
        <input
          type={tokenVisible ? 'text' : 'password'}
          value={apiToken.apiToken}
          readOnly
          className="p-3 bg-gray-800 rounded-lg w-full"
        />
        <button
          onClick={() => setTokenVisible(!tokenVisible)}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          {tokenVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      <button
        onClick={() => generateTokenMutation.mutate()}
        className="mt-4 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
      >
        Generate New Token
      </button>
    </div>
  );
}
