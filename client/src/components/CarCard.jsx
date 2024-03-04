function CarCard({ Car }) {
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <h1 className="text-2xl font-bold">{Car.BRAND}</h1>
      <p className="text-slate-300">{CAR.MODEL}</p>
      <div className="flex gap-x-2"></div>
    </div>
  );
}

export default CarCard;
