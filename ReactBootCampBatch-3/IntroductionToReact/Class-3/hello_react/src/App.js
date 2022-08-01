import Content from "./Content";
import Footer from "./Footer";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

function App() {
  return (
     // here occurs composition(React Philosophy) in div element.
     <div>
        <TopBar />
        <Content />
        <SideBar />
        <Footer />
     </div>
  );
}

export default App;
