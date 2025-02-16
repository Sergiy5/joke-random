export const Loader: React.FC = () => {
  return (
    <div
      className={`flex items-center justify-center w-full opacity-0.50`}
    >
      <div className="flex justify-center items-center">
        <div
          className={`size-5 border-[4px] border-t-[4px] border-gray-200 border-solid rounded-full animate-spin
           border-t-blue-300 border-r-blue-500 border-b-blue-200 border-l-blue-700`}
        ></div>
      </div>
    </div>
  );
};
