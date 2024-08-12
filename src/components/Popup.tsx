function Popup({ message }: { message: string }) {
  return (
    <div className='absolute bottom-0 left-0 m-4 block rounded-md border-slate-700 bg-slate-600 p-3'>
      <p>{message}</p>
    </div>
  );
}

export default Popup;
