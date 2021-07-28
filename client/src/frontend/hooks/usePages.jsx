import React, { useState } from "react";


export default function usePages() {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        console.log("handle change");
        console.log(value);
        setPage(value);
    }

    return {page, handleChange};
}