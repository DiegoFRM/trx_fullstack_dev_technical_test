import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-700 flex justify-between py-4 px-4 ">
      <Link to="/">
        <h1 className="text-2xl font-bold">Home</h1>
      </Link>
      <ul className="flex gap-x-2">
        <li>
          <Link to="/car-list" className="bg-cyan-600 py-1 px-4 rounded-sm">
            Lista de autos
          </Link>
        </li>
        <li>
          <Link to="/create-car" className="bg-cyan-600 py-1 px-4 rounded-sm">
            Nuevo auto
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
