import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ApiContext = createContext()


export const ApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [staff, setStaff] = useState([])
    const [users, setUsers] = useState([])
    const [pendingorders, setPendingOrders] = useState([])
    const [completedorders, setCompletedOrders] = useState([])
    const [departments, setDepartments] = useState([])
    const [availabledepartments, setAvailableDepartments] = useState([])
    const [allorders, setAllOrders] = useState([])
    const [totalsales, setTotalsales] = useState(0)
    const [projectedsales, setProjectedsales] = useState(0)
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])
    const [arts, setArts] = useState([])

    // get categories
    const getAllCategories = async () => {
        setLoading(true)
        try {
            const response = await axios.get("http://server.broddiescollection.com/api/v1/admin/getcategories");
            const data = response.data;
            setLoading(false)
            setCategories(data)
            // console.log("categ", data)

        } catch (error) {
            console.log("error getting orders")
            setLoading(false)
            // toast.error("error getting orders")

        }
    }


    const getAllArt = async () => {
        setLoading(true)
        try {
            const response = await axios.get("http://server.broddiescollection.com/api/v1/admin/getart");
            const data = response.data;
            setLoading(false)
            setArts(data)
            // console.log("categ", data)

        } catch (error) {
            // console.log("error getting meals")
            setLoading(false)
            // toast.error("error getting meals")

        }
    }






    const getAllOrders = async () => {
        setLoading(true)
        try {
            const response = await axios.get("http://server.broddiescollection.com/api/v1/admin/getallorders");
            const data = response.data;
            setLoading(false)
            setAllOrders(data)
            // console.log("staff", data)
            const totalSales = data.reduce((sum, order) => sum + Number(order.mealid.price), 0);
            console.log("Total PROJECTED Sales:", totalSales);
            setProjectedsales(totalSales);

        } catch (error) {
            console.log("error getting orders")
            setLoading(false)
            // toast.error("error getting orders")

        }
    }
    const getStaff = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://saccoserver.vercel.app/api/v1/admin/getstaff");
            const data = response.data;
            setLoading(false)
            setStaff(data)
            // console.log("staff", data)

        } catch (error) {
            console.log("error getting staff")
            setLoading(false)
            toast.error("error getting staff")

        }
    }

    // get users


    const getUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://smokey.haramad.co.ke/api/v1/admin/getcustomers");
            const data = response.data;
            setLoading(false)
            setUsers(data)

        } catch (error) {
            console.log("error getting users")
            setLoading(false)
            toast.error("error getting users")

        }
    }


    const getPendingOrders = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://smokey.haramad.co.ke/api/v1/admin/getpendingorders");
            const data = response.data;
            setLoading(false)
            setPendingOrders(data)

        } catch (error) {
            console.log("error getting orders")
            setLoading(false)
            // toast.error("error getting orders")

        }
    }


    const getCompletedOrders = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://smokey.haramad.co.ke/api/v1/admin/getcompletedorders");
            const data = response.data;
            setLoading(false)
            setCompletedOrders(data)

            const totalSales = data.reduce((sum, order) => sum + Number(order.mealid.price), 0);
            console.log("Total Sales:", totalSales);
            setTotalsales(totalSales); // Store in state if needed

        } catch (error) {
            console.log("error getting orders")
            setLoading(false)
            // toast.error("error getting orders")

        }
    }





    const deleteStaff = async (staffid) => {
        setLoading(true)
        try {
            const response = await axios.delete(`https://saccoserver.haramad.co.ke/api/v1/admin/deletestaff/${staffid}`)
            const data = response.data;
            console.log("staff deleted", data)
            getStaff()
            getAvailableDepartments()
            setLoading(false)
        } catch (error) {
            console.log("error deleting staff")
            toast.error("error deleting staff")
            setLoading(false)

        }
    }

    const deleteUser = async (deleteUser) => {
        setLoading(true)
        try {
            const response = await axios.delete(`https://saccoserver.haramad.co.ke/api/v1/admin/deleteuser/${deleteUser}`)
            const data = response.data;
            console.log("staff deleted", data)
            getUsers()
            getAvailableDepartments()
            setLoading(false)
        } catch (error) {
            console.log("error deleting staff")
            toast.error("error deleting staff")
            setLoading(false)

        }
    }


    const updateUser = async (userdata) => {
        console.log("updating account", userdata?.username)
        // return
        try {
            const response = await axios.put(`https://saccoserver.haramad.co.ke/api/v1/admin/updateuser/${userdata?.userid}`,
                {
                    username: userdata?.username,
                    email: userdata?.email,
                    phone: userdata?.phone,
                    password: userdata?.password

                }
            )
            const data = response.data;
            console.log("staff updated", data)
            getUsers()
            getAvailableDepartments()
            setLoading(false)

        } catch (error) {
            console.log("error updating user")
            toast.error("error updating user")
            setLoading(false)

        }
    }


    const updateOrder = async (orderid,action) => {
        console.log("order upt",orderid,action)
        // return
        try {
            const response = await axios.post("https://smokey.haramad.co.ke/api/v1/admin/updateorder", { orderid,status:action })
            const data = response.data;
            console.log("order updated", data)
            toast.success("order updated")
            setLoading(false)
            getCompletedOrders()
            getCompletedOrders()
            getPendingOrders()
        } catch (error) {
            console.log("order updating failed", error)
            toast.success("order update failure")

        }
    }

    const updateFeatured = async (mealid,action) => {
        console.log("meal upt",mealid,action)
        // return
        try {
            const response = await axios.post("https://smokey.haramad.co.ke/api/v1/admin/updatefeatured", { mealid,featured:action })
            const data = response.data;
            console.log("meal updated", data)
            toast.success("order updated")
            setLoading(false)
            getCompletedOrders()
            getCompletedOrders()
            getPendingOrders()
            getAllArt();
        } catch (error) {
            console.log("order updating failed", error)
            toast.success("order update failure")

        }
    }


    const updatePopular = async (mealid,action) => {
        console.log("meal upt",mealid,action)
        // return
        try {
            const response = await axios.post("https://smokey.haramad.co.ke/api/v1/admin/updatepopularity", { mealid,popular:action })
            const data = response.data;
            console.log("mealpopularity  updated", data)
            toast.success("order updated")
            setLoading(false)
            getCompletedOrders()
            getCompletedOrders()
            getPendingOrders()
            getAllArt();
        } catch (error) {
            console.log("order updating failed", error)
            toast.success("order update failure")

        }
    }




    useEffect(() => {
        // get users
        getUsers()
        getPendingOrders()
        getCompletedOrders()
        getAllOrders()
        getAllCategories()
        getAllArt()
    }, [])
    return (
        <ApiContext.Provider value={
            {
                users,
                getUsers,
                loading,
                completedorders,
                pendingorders,
                getCompletedOrders,
                getPendingOrders,
                getAllOrders,
                allorders,
                totalsales,
                arts,
                categories, getAllCategories, meals, getAllArt,updateOrder,updateFeatured,updatePopular

            }
        }>
            {children}
        </ApiContext.Provider>
    )
}