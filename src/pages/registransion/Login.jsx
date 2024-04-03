import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import { Timestamp, addDoc, collection, setDoc, doc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("me@example.com");
  const [password, setPassword] = useState("123456789");

  const context = useContext(myContext);
  const { loading, setLoading ,find_user_from_db, setUser_infor} = context;

  const signinGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const { _tokenResponse, user } = result;

        const user_firebase = {
          name: user.displayName,
          //uid: user.providerData[0].uid,
          email: user.email,
          time: Timestamp.now(),
          imageURL: user.photoURL,
        };
        // const token = credential.accessToken;
        // // The signed-in user info.
        const user_local = user;
        localStorage.setItem("user", JSON.stringify(user_local));
        setUser_infor(user_local)
        console.log(user)
        if (_tokenResponse.isNewUser) {
          const userRef = doc(fireDB, "users", user.uid);
          setDoc(userRef, user_firebase);
          toast.success("Signin Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    //const provider = await GoogleAuthProvider(auth)
  };
  const signin = async () => {
    const auth = getAuth();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser_infor(result.user)
     
      // const user = auth.currentUser;
     
      toast.success("Signin Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    navigate("/");
      //  window.location.href='/'
      setLoading(false);
    } catch (error) {
      console.log(error)
      toast.error("Sigin Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>

        <div className="flex justify-center">
          <button onClick={(()=>{
            alert("This function has not been completed yet, please sign in with google or account !")
          })}
            type="button"
            class=" flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <FaFacebook /> Facebook
          </button>
          <button
            onClick={signinGoogle}
            type="button"
            class=" flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <FaGoogle /> Google
          </button>
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={signin}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
