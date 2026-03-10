//url : http://localhost:3000/blog/1

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function getBlog() {
    return (
        <div style={{
            height: "80vh",
            width: "60vw",
            border: "1px solid black"
        }}>
            This is a page to get all the blogs
        </div>
    )
}