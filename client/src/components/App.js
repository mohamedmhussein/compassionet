import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Login from "./Login";
import NewKindness from "./NewKindness";
import KindnessList from "./KindnessList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllKindnesses from "./AllKindnesses"
import EditKindness from "./EditKindness"



function App() {
  
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // auto-login
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() =>{
    fetch("/categories")
    .then((r) => {
      if (r.ok) {
        r.json().then((category) => {
            setCategories(category)
            console.log(category)
        })
        
      }
    });
  },[])
  
  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/new">
            <NewKindness user={user} categories = {categories} />
          </Route>
          <Route exact path="/">
            <KindnessList />
          </Route>
          <Route exact path="/all">
            <AllKindnesses />
          </Route>
          <Route
          path="/kindness/:id/edit"
          render={({ match }) => {
            const kindnessId = match.params.id;

            return <EditKindness kindnessId={kindnessId} categories={categories} />;
          }}
        />
        </Switch>
      </main>
    </Router>
  )
}

export default App;
