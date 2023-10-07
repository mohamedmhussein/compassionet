import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Login from "./Login";
import NewKindness from "./NewKindness";
import KindnessList from "./KindnessList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewKindness user={user} />
          </Route>
          <Route path="/">
            <KindnessList />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App;
