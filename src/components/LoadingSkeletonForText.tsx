export const LoadingSkeletonForText = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`${loading && 'skeleton'} ${
      !loading && 'block text-transparent'
    } rounded-xl`}
  >
    {children}
  </div>
);
