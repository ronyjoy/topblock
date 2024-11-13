  import MembersSignUp from "./MembersSignUp";
  const MainContent = ({ setPlayerCount }) => {
    return (
      <main className="App-main">
      <div className="SignUp">
        <MembersSignUp setPlayerCount={setPlayerCount} />
      </div>
      </main>
    );
  };

  export default MainContent;