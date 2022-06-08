import { useContext } from "react";
import VendorsContext from "../context/VendorsContext";

const useVendors = () => useContext(VendorsContext);

export default useVendors;
