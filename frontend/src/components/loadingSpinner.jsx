export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-slate/50 backdrop-blur-sm">
      <div className="h-[50px] w-[50px] bg-transparent border-6 border-double border-purple-300 border-t-purple-700 rounded-full animate-spin"></div>
    </div>
  );
}
