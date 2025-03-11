export const SkeletonLoader = ({ type }: { type: 'flags' | 'tokens' }) => {
  return (
    <div className="space-y-4">
      <div className="h-8 w-1/2 bg-gray-700 rounded animate-pulse"></div>

      {type === 'flags' ? (
        // Skeleton for Feature Flags
        <ul className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="h-10 bg-gray-800 rounded-lg animate-pulse"
            ></li>
          ))}
        </ul>
      ) : (
        // Skeleton for API Tokens
        <div className="flex space-x-3">
          <div className="h-10 w-full bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      )}
    </div>
  );
};
