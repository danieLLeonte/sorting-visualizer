const ActionBar = ({ handleResetArray, mergeSort }) => (
  <div className="flex justify-center gap-6">
    <button className="bg-green-500 font-bold" onClick={mergeSort}>
      Visualize Merge Sort
    </button>
    <button className="bg-red-500 font-bold" onClick={handleResetArray}>
      Reset
    </button>
  </div>
);

const Navbar = ({ handleResetArray, mergeSort }) => {
  return (
    <>
      <nav className="flex justify-between items-center bg-gray-800 py-4 px-6">
        <a href="/" className="text-white font-bold">
          <h1 className="text-2xl hidden sm:block">Sorting Visualizer</h1>
        </a>
        <ActionBar handleResetArray={handleResetArray} mergeSort={mergeSort} />
      </nav>
    </>
  );
};

export default Navbar;
