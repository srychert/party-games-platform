function Error({ message }) {
  return (
    <div className="mx-auto self-center">
      {message && <div className="m-2 animate-spin text-xl">{message}</div>}
    </div>
  );
}

export default Error;
