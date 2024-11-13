import { useContext, useState } from "react";
import { Image, TabList, Tab } from "@fluentui/react-components";
import "./sample/Welcome.css";
//import "../global.css";
import { CurrentUser } from "./sample/CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import { app } from "@microsoft/teams-js";
import { Vote } from "./poll/vote";
import { List } from "./poll/list";
import { Create } from "./poll/create";

export function Main(props) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data.displayName;
  const hubName = useData(async () => {
    await app.initialize();
    const context = await app.getContext();
    return context.app.host.name;
  })?.data;
  const [selectedValue, setSelectedValue] = useState("create");

  const onTabSelect = (event, data) => {
    setSelectedValue(data.value);
  };
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">Welcome{userName ? ", " + userName : ""}!</h1>
        {/*<p className="center">Your app is running in your {friendlyEnvironmentName}</p>
        {hubName && <p className="center">Your app is running in {hubName}</p>}*/}

        <div className="tabList">
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
            <Tab id="Create" value="create">
              Create
            </Tab>
            <Tab id="Vote" value="vote">
              Vote
            </Tab>
            <Tab id="List" value="list">
              View
            </Tab>
          </TabList>
          <div>
            {selectedValue === "create" && (
              <div>
                <Create />
              </div>
            )}
            {selectedValue === "vote" && (
              <div>
                <Vote />
              </div>
            )}
            {selectedValue === "list" && (
              <div>
                <List />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
