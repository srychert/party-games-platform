function Error({ message }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      {message && <div className="text-xl font-bold text-red-600">{message}</div>}
    </div>
  );
}

export default Error;
