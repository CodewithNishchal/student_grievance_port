const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const spinner = (
    <div className={`spinner ${sizeClasses[size]}`}>
      <div className="spinner-border"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-screen">
        {spinner}
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
