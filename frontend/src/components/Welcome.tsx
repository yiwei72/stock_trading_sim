import React from "react";

interface Props {
  handleLogout: () => void;
}

const Welcome: React.FC<Props> = ({ handleLogout }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
