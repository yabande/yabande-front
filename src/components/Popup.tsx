function Popup({ message }: { message: string }) {
  return (
    <div className='block absolute bottom-0 left-0 m-4 p-3 bg-slate-600 border-slate-700 rounded-md'>
      <p>{message}</p>
    </div>
  );
}

export default Popup;
