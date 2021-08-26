export const userDataStructure = {
    id: "",
    role: "user",
    name: "",
    phone: "",
    email: "",
    dob: "",
    gender: true,
    address: "",
    subscribed: false,
    delivery: [],
    "cart": {
        "products": [],
        "total": 0
    }
}

export const colors = [
    { name: "Đen", id: "#000000" },
    { name: "Trắng", id: "#FFFFFF" },
    { name: "Xanh nước biển", id: "#5DADE2" },
    { name: "Vàng", id: "#F7DC6F" },
    { name: "Ghi", id: "#BFC9CA" },
    { name: "Xanh rêu", id: "#48C9B0" },
    { name: "Xanh lục", id: "#239B56" },
    { name: "Cam", id: "#E59866" },
    { name: "Tím", id: "#884EA0" },
    { name: "Nâu", id: "#94795c" },
    { name: "Mix", id: "mix" },
    { name: "Be", id: "#ecdcc5" },
    { name: "Đỏ đô", id: "#dc243c" },
    { name: "Tím than", id: "#414859" }
]

export const materials = [
    { id: "1", name: "Kaki" },
    { id: "2", name: "Cotton" },
    { id: "3", name: "Nỉ" },
    { id: "4", name: "Bò" },
    { id: "5", name: "Lông cùn" },
    { id: "6", name: "Lụa" },
    { id: "7", name: "Len" }
]
export const subcategories = [
    { id: "1", name: "ÁO PHÔNG" },
    { id: "2", name: "ÁO BA LỖ" },
    { id: "3", name: "ÁO SƠ MI" },
    { id: "4", name: "ÁO THUN DÀI TAY" },
    { id: "5", name: "ÁO LEN" },
    { id: "6", name: "ÁO NỈ KHÔNG MŨ" },
    { id: "7", name: "ÁO NỈ MŨ" },
    { id: "8", name: "ÁO KHOÁC NỈ" },
    { id: "9", name: "ÁO KHOÁC" },
    { id: "10", name: "QUẦN SHORT" },
    { id: "11", name: "QUẦN JEANS" },
    { id: "12", name: "QUẦN DÀI" },
    { id: "13", name: "QUẦN KAKI" },
    { id: "14", name: "QUẦN JOGGER" }
]

export const orderStatuses = [
    "Đã tiếp nhận",
    "Đơn hàng mới",
    "Đang xử lý",
    "Đang vận chuyển",
    "Hoàn tất"
]

export const paymentMethods = [
    "Thanh toán qua thẻ ATM nội địa, Visa, Master card",
    "Thanh toán qua MOMO",
    "Thanh toán khi nhận hàng"
]