import Layout from "./layouts/Layout";
import logo from './assets/Logo.png';
import serchButton from './assets/SearchButton.png';


function App() {
  return (
    <Layout>
      <main>
        <div className="container mx-auto pt-[96px]">
          <div className="flex justify-center items-center">
            <div className="ml-[50px] flex flex-col w-[414px] h-[416px]">
              <img src={logo} />
              <div className="flex items-center justify-between  w-[361px] py-[8px] pl-[10px] pr-[10px] border border-[#FF8400] rounded-[20px]">
                <input type="text"  className="focus:outline-none" placeholder="Insert you identity ..."/>
                <button><img src={serchButton}/></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default App;
