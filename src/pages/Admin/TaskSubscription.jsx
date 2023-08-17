import React from "react";
import { Helmet } from "react-helmet";
import SubscriptionTable from "../../components/Admin/TaskSubsciption/SubscriptionTable";

function TaskSubscription() {
  return (
    <div>
      <Helmet>
        <title>Task Subscription | MindEase</title>
      </Helmet>
      <SubscriptionTable />
    </div>
  );
}

export default TaskSubscription;
