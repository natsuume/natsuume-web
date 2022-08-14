import { Routes, Route } from "react-router-dom";
import { TopPage } from "../pages/TopPage";
import { Publications } from "../pages/Publications";
import { Posts } from "../pages/Posts";
import { Applications } from "../pages/Applications";
import { Others } from "../pages/Others";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<TopPage></TopPage>}></Route>
      <Route
        path="/publications"
        element={<Publications></Publications>}
      ></Route>
      <Route path="/posts" element={<Posts></Posts>}></Route>
      <Route
        path="/applications"
        element={<Applications></Applications>}
      ></Route>
      <Route path="/others" element={<Others></Others>}></Route>
    </Routes>
  );
};
