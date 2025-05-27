const ActionList = () => {
  return (
    <div className="row row-cols-4">
      {["Belajar", "Baca", "Tanya", "Diskusi"].map((action, index) => (
        <div className="col-6 bg-black rounded text-white" key={index}>
          <div className="">{action}</div>
        </div>
      ))}
    </div>
  );
};

export default ActionList;
