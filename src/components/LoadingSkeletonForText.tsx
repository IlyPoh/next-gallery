export const LoadingSkeletonForText = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => (
  <div className={`${loading && 'skeleton block text-transparent rounded-xl'}`}>
    {children}
  </div>
);
