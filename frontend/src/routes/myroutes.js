// import PageNotFound from "../pages/404";
// import Captains from "../pages/Captains";
import DreamTeam from "../pages/DreamTeam";
// import EditTeam from "../pages/EditTeam";
// import EditTournament from "../pages/EditTournament";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Series from "../pages/Series";
import Squads from "../pages/Squads";
import Captains from "../pages/Captains";

import PageNotFound from "../pages/PageNotFound";

// import Iagetotext from "../pages/Imagetotext";
import Match from "../pages/Match";
import User from "../pages/User";
// import PeopleEdit from "../pages/PeopleEdit";
import Players from "../pages/Players";
import AddPlayer from "../pages/AddPlayer";
// import PlayersEdit from "../pages/PlayersEdit";
import Playing11 from "../pages/Playing11";
// import Points from "../pages/Points";
import Prediction from "../pages/Prediction";
import Result from "../pages/Result";
import Team from "../pages/Team";
import Tournament from "../pages/Tournament";
// import UserPlayerEdit from "../pages/UserPlayerEdit";


export const MyRoutes = [
  {
    path: "/",
    component: Home,
    title: "Home",
    adminroute: "no",
    protected: "no"
  },
  {
    path: "/login",
    component: Login,
    title: "Login",
    adminroute: "no",
    protected: "no",
    menu: "yes"
  },
  {
    path: "/register",
    component: Register,
    title: "Register",
    adminroute: "no",
    protected: "no"
  },
  {
    path: "/series",
    component: Series,
    title: "Series",
    adminroute: "no",
    protected: "yes"
  },
  {
    path: "/squad",
    component: Squads,
    title: "Squads",
    adminroute: "no",
    protected: "yes"
  },
  {
    path: "/playing-11",
    component: Playing11,
    title: "Home",
    adminroute: "no",
    protected: "yes"
  },
  {
    path: "/captains",
    component: Captains,
    title: "Home",
    adminroute: "no",
    protected: "yes"
  },
  {
    path: "/prediction",
    component: Prediction,
    title: "Home",
    adminroute: "no",
    protected: "yes"
  },
  // {
  //   path: "/player/:pid/:mid/edit",
  //  // component: UserPlayerEdit,
  //   title: "Player Edit",
  //   adminroute: "no",
  //   protected: "yes"
  // },
  {
    path: "/dream-team",
    component: DreamTeam,
    title: "Home",
    adminroute: "no",
    protected: "yes"
  },
  {
    path: "/result",
    component: Result,
    title: "Home",
    adminroute: "no",
    protected: "yes"
  },
  {
    path: "/match",
    component: Match,
    title: "Home",
    adminroute: "no",
    protected: "yes"
  },
  // {
  //   path: "/points",
  //  // component: Points,
  //   title: "Points",
  //   adminroute: "no",
  //   protected: "yes"
  // },
  // {
  //   path: "/img-to-text",
  //  // component: Imagetotext,
  //   title: "Points",
  //   adminroute: "yes",
  //   protected: "no"
  // },
  {
    path: "/admin/user",
    component: User,
    title: "User",
    adminroute: "yes",
    protected: "no"
  },
  // {
  //   path: "/admin/people/:uid/edit",
  //  // component: PeopleEdit,
  //   title: "Home",
  //   adminroute: "yes",
  //   protected: "no"
  // },
  {
    path: "/admin/tournament",
   component: Tournament,
    title: "Home",
    adminroute: "yes",
    protected: "no"
  },
  // {
  //   path: "/admin/tournament/:tid/edit",
  //  // component: EditTournament,
  //   title: "Home",
  //   adminroute: "yes",
  //   protected: "no"
  // },
  {
    path: "/admin/team",
   component: Team,
    title: "Home",
    adminroute: "yes",
    protected: "no"
  },
  // {
  //   path: "/admin/team/:tmid/edit",
  //  // component: EditTeam,
  //   title: "Home",
  //   adminroute: "yes",
  //   protected: "no"
  // },
  {
    path: "/admin/players",
    component: Players,
    title: "Home",
    adminroute: "yes",
    protected: "no"
  },
  {
    path: "/admin/player/add",
    component: AddPlayer,
    title: "Home",
    adminroute: "yes",
    protected: "no"
  },
  // {
  //   path: "/admin/player/:pid/edit",
  //  // component: PlayersEdit,
  //   title: "Home",
  //   adminroute: "yes",
  //   protected: "no"
  // },
  {
    path: "*",
    component: PageNotFound,
    title: "404",
    adminroute: "no",
    protected: "no",
    menu: "yes"
  },
];
