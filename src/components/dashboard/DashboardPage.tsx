import DashboardController from "./DashboardController";
import OpenFeedbackList from "./OpenFeedbackList";
import HubList from "./HubList";

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 xxs:px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 leading-5">
          Manage your feedback spaces and collaboration hubs.
        </p>
      </div>

      {/* Main Content */}
      <DashboardController
        hubList={<HubList />}
        openFeedbackList={<OpenFeedbackList />}
      />
    </div>
  );
};
export default DashboardPage;