import React from "react";
import Layout from "../components/layout";
import withPermissions from "../../HOC/PermissionCheck";

const Users = () => {
  return (
    <Layout>
      {" "}
      <div></div>
    </Layout>
  );
};

export default withPermissions(Users, ["admin"]);