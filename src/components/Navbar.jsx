const ActionBar = ({}) => (
  <div className="flex justify-center gap-6">
    <button className="bg-green-500 font-bold">Visualize Merge Sort</button>
    <button className="bg-red-500 font-bold">Reset</button>
  </div>
);

const Navbar = ({}) => {
  return (
    <>
      <nav className="flex justify-between items-center bg-gray-800 py-4 px-6">
        <a href="/" className="text-white font-bold">
          <h1 className="text-2xl">Sorting Visualizer</h1>
        </a>
        <ActionBar />
      </nav>
    </>
  );
};

export default Navbar;
