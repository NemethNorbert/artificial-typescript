export default function Spinner() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-center ">
        <div className="w-16 h-16 border-b-2 border-green-900 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
