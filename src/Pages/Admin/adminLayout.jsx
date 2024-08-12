import Header from "../template/header";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;
