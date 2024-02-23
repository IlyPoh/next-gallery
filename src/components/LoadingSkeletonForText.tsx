export const LoadingSkeletonForText = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => (
  <div className={`${loading && "skeleton block rounded-xl text-transparent"}`}>
    {children}
  </div>
);
