import React from "react";
import UrlForm from "../components/UrlForm";
import UserUrlList from "../components/UserUrlList";

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background p-4">
      <div className="flex flex-row justify-center items-center space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* URL Creation Form */}
          <div className="flex sticky top-4 h-screen items-start">
            <UrlForm />
          </div>

          {/* User URLs List */}
          <div className="flex items-start">
            <UserUrlList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
