import React, { useContext, useEffect } from "react";
import myContext from "../../../../context/data/myContext";
import { Link,useNavigate,useParams  } from "react-router-dom";

function AddCategory() {
  const context = useContext(myContext);
  const { category, setCategory, updateCategory , get_OneCategorytData} = context;
  const navigate = useNavigate();
  const { id_category } = useParams();
  useEffect(() => {
    get_OneCategorytData(id_category);
  }, []);
 
  const Link_dashbroad = () => {
    navigate("/dashboard/categorydetail");
  };

  const  handleUpdateCaterogy = async () => {
  const respon = await updateCategory();

    if (respon){
        Link_dashbroad();
    }
  };
  return (
   
    <div className=" container mt-5">
    <div class=" container grid grid-cols-1 md:grid-cols-2 gap-5">
    <div class="mb-5 ">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            onChange={(e) =>
              setCategory({ ...category, title: e.target.value })
            }
            value={category.title}
            name="title"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        <div class="mb-5 ">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            onChange={(e) =>
              setCategory({ ...category, imageUrl: e.target.value })
            }
            value={category.imageUrl}
            name="title"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        
        <div className=" w-full gap-2  flex items-center my-3 ">
          <button
            onClick={Link_dashbroad}
            className="  bg-primary/40 hover:bg-primary w-[90px] font-bold  px-2 py-2 rounded-lg"
          >
            Go back
          </button>

          <button
             onClick={handleUpdateCaterogy}
            className="w-[150px]   bg-primary/40 hover:bg-primary font-bold  px-2 py-2 rounded-lg"
          >
             Update Category
          </button>
        </div>

        
        </div>
      </div>
   
  );
}

export default AddCategory;
