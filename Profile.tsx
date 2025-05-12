import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Your Info</h2>
        <p>Name: [Your Name]</p>
        <p>Email: [your@email.com]</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Waste Pickup History</h2>
        <ul className="list-disc pl-4">
          <li>Plastic - 3kg - Pending</li>
          <li>Metal - 5kg - Completed</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Food Donations</h2>
        <ul className="list-disc pl-4">
          <li>5 plates of rice - Delivered</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">EcoPoints Summary</h2>
        <p>Total Points: 120</p>
        <p>Meals Rescued: 20</p>
        <p>Waste Recycled: 8 kg</p>
      </div>
    </div>
  );
};

export default Profile;
