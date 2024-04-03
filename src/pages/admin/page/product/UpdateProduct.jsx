import React, { useContext, useEffect } from "react";
import myContext from "../../../../context/data/myContext";
import { Link, useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
  const context = useContext(myContext);
  const {
    products,
    setProducts,
    updateProduct,
    get_OneProductData,getCategorysData,
    categorys,
  } = context;
  const navigate = useNavigate();
  const { id_product } = useParams();
  useEffect(() => {
    get_OneProductData(id_product);
  }, []);

  useEffect(()=>{
    getCategorysData()
  },[]) 
  const Link_dashbroad = () => {
    navigate("/dashboard/productdetail");
  };

  const handleUpdateProduct = async () => {
    const respon = await updateProduct();

    if (respon) {
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
              setProducts({ ...products, title: e.target.value })
            }
            value={products.title}
            name="title"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="text"
            name="price"
            onChange={(e) =>
              setProducts({ ...products, price: e.target.value })
            }
            value={products.price}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Inventory Quantity
          </label>
          <input
            type="text"
            name="inventory_quantity"
            onChange={(e) =>
              setProducts({ ...products, inventory_quantity: e.target.value })
            }
            value={products.inventory_quantity}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div class="mb-5">
          <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ImgURL
          </label>
          <input
            type="text"
            name="imageurl"
            onChange={(e) =>
              setProducts({ ...products, imageUrl: e.target.value })
            }
            value={products.imageUrl}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div>
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select category
          </label>

          <select
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setProducts({ ...products, category: e.target.value })
            }
            value={products.category}
          >
            {categorys.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
      
              <div class="">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>

          <textarea
            value={products.description}
            cols="20"
            rows="1"
            name="description"
            onChange={(e) =>
              setProducts({ ...products, description: e.target.value })
            }
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>

        <div className=" w-full gap-2  flex items-center my-3 ">
          <button
            onClick={Link_dashbroad}
            className="  bg-primary/40 hover:bg-primary w-[90px] font-bold  px-2 py-2 rounded-lg"
          >
            Go back
          </button>

          <button
            onClick={handleUpdateProduct}
            className="w-[150px]   bg-primary/40 hover:bg-primary font-bold  px-2 py-2 rounded-lg"
          >
            Update Product
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default UpdateProduct;
